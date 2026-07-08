import { LeadRepository } from '../repositories/lead.repository';
import { CreateLeadDto, UpdateLeadDto } from '../dto/crm.dto';
import { PrismaService } from '../../../common/prisma/prisma.service';
export declare class LeadService {
    private readonly repo;
    private readonly prisma;
    constructor(repo: LeadRepository, prisma: PrismaService);
    getLeads(tenantId: string): Promise<({
        assignedTo: {
            status: import(".prisma/client").$Enums.UserStatus;
            email: string;
            id: string;
            tenantId: string;
            passwordHash: string;
            createdAt: Date;
            updatedAt: Date;
            deletedAt: Date | null;
        } | null;
        activities: {
            type: string;
            description: string;
            id: string;
            createdAt: Date;
            updatedAt: Date;
            leadId: string;
            date: Date;
        }[];
        notes: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            content: string;
            leadId: string;
        }[];
    } & {
        status: import(".prisma/client").$Enums.LeadStatus;
        email: string;
        firstName: string;
        lastName: string;
        id: string;
        tenantId: string;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date | null;
        phone: string | null;
        company: string | null;
        source: string | null;
        assignedToId: string | null;
        score: number;
    })[]>;
    getLeadById(tenantId: string, id: string): Promise<({
        assignedTo: {
            status: import(".prisma/client").$Enums.UserStatus;
            email: string;
            id: string;
            tenantId: string;
            passwordHash: string;
            createdAt: Date;
            updatedAt: Date;
            deletedAt: Date | null;
        } | null;
        activities: {
            type: string;
            description: string;
            id: string;
            createdAt: Date;
            updatedAt: Date;
            leadId: string;
            date: Date;
        }[];
        notes: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            content: string;
            leadId: string;
        }[];
    } & {
        status: import(".prisma/client").$Enums.LeadStatus;
        email: string;
        firstName: string;
        lastName: string;
        id: string;
        tenantId: string;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date | null;
        phone: string | null;
        company: string | null;
        source: string | null;
        assignedToId: string | null;
        score: number;
    }) | null>;
    createLead(tenantId: string, actionUserId: string, dto: CreateLeadDto): Promise<{
        status: import(".prisma/client").$Enums.LeadStatus;
        email: string;
        firstName: string;
        lastName: string;
        id: string;
        tenantId: string;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date | null;
        phone: string | null;
        company: string | null;
        source: string | null;
        assignedToId: string | null;
        score: number;
    }>;
    updateLead(tenantId: string, id: string, actionUserId: string, dto: UpdateLeadDto): Promise<{
        status: import(".prisma/client").$Enums.LeadStatus;
        email: string;
        firstName: string;
        lastName: string;
        id: string;
        tenantId: string;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date | null;
        phone: string | null;
        company: string | null;
        source: string | null;
        assignedToId: string | null;
        score: number;
    }>;
    deleteLead(tenantId: string, id: string, actionUserId: string): Promise<{
        status: import(".prisma/client").$Enums.LeadStatus;
        email: string;
        firstName: string;
        lastName: string;
        id: string;
        tenantId: string;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date | null;
        phone: string | null;
        company: string | null;
        source: string | null;
        assignedToId: string | null;
        score: number;
    }>;
}
