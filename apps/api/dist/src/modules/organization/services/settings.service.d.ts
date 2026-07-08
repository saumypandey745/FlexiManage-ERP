import { OrganizationRepository } from '../organization.repository';
import { BusinessProfileDto, OrganizationSettingsDto } from '../dto/settings.dto';
import { PrismaService } from '../../../common/prisma/prisma.service';
export declare class SettingsService {
    private readonly repo;
    private readonly prisma;
    constructor(repo: OrganizationRepository, prisma: PrismaService);
    getOrganizationInfo(tenantId: string): Promise<({
        profile: {
            id: string;
            tenantId: string;
            createdAt: Date;
            updatedAt: Date;
            version: number;
            address: string | null;
            phone: string | null;
            legalName: string;
            businessEmail: string | null;
            gstNumber: string | null;
            panNumber: string | null;
            country: string;
            logoUrl: string | null;
            brandingColor: string | null;
        } | null;
    } & {
        status: import(".prisma/client").$Enums.TenantStatus;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date | null;
        name: string;
        subscription: import(".prisma/client").$Enums.SubscriptionPlan;
        timezone: string;
        currency: string;
    }) | null>;
    updateSettings(tenantId: string, userId: string, dto: OrganizationSettingsDto): Promise<{
        status: import(".prisma/client").$Enums.TenantStatus;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date | null;
        name: string;
        subscription: import(".prisma/client").$Enums.SubscriptionPlan;
        timezone: string;
        currency: string;
    }>;
    updateBusinessProfile(tenantId: string, userId: string, dto: BusinessProfileDto): Promise<{
        id: string;
        tenantId: string;
        createdAt: Date;
        updatedAt: Date;
        version: number;
        address: string | null;
        phone: string | null;
        legalName: string;
        businessEmail: string | null;
        gstNumber: string | null;
        panNumber: string | null;
        country: string;
        logoUrl: string | null;
        brandingColor: string | null;
    }>;
}
