import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../common/prisma/prisma.service';
import { RegisterTenantDto } from './dto/register.dto';
import * as argon2 from 'argon2';

@Injectable()
export class AuthRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findUserByEmail(email: string) {
    return this.prisma.user.findFirst({
      where: { email, deletedAt: null },
      include: {
        tenant: true,
        roles: { include: { role: true } },
      },
    });
  }

  async findById(id: string) {
    return this.prisma.user.findUnique({
      where: { id },
      include: { roles: { include: { role: true } } },
    });
  }

  async createTenantWithAdmin(dto: RegisterTenantDto) {
    const hashedPassword = await argon2.hash(dto.password);
    
    return this.prisma.$transaction(async (tx) => {
      // 1. Create Tenant
      const tenant = await tx.tenant.create({
        data: {
          name: dto.companyName,
          status: 'ACTIVE',
        },
      });

      // 2. Create Global Admin Role for Tenant
      const adminRole = await tx.role.create({
        data: {
          name: 'SuperAdmin',
          tenantId: tenant.id,
        },
      });

      // 3. Create Admin User
      const user = await tx.user.create({
        data: {
          email: dto.email,
          passwordHash: hashedPassword,
          tenantId: tenant.id,
          status: 'ACTIVE',
          roles: {
            create: {
              roleId: adminRole.id,
            },
          },
        },
      });

      // 4. Create Employee Profile
      await tx.employee.create({
        data: {
          tenantId: tenant.id,
          userId: user.id,
          employeeCode: 'EMP-0001',
          firstName: dto.firstName,
          lastName: dto.lastName,
          status: 'CONFIRMED',
        },
      });

      return { tenant, user };
    });
  }

  async updateUserPassword(userId: string, passwordHash: string) {
    return this.prisma.user.update({
      where: { id: userId },
      data: { passwordHash },
    });
  }

  async markEmailAsVerified(userId: string) {
    // We didn't define emailVerifiedAt in Phase 06C Prisma Schema, 
    // but typically you would update a timestamp or status here.
    // Assuming status transitions from PENDING -> ACTIVE (though in our MVP they start ACTIVE).
    return this.prisma.user.update({
      where: { id: userId },
      data: { status: 'ACTIVE' },
    });
  }
}
