import { LeadService } from '../services/lead.service';
import { CreateLeadDto, UpdateLeadDto } from '../dto/crm.dto';
export declare class LeadController {
    private readonly leadService;
    constructor(leadService: LeadService);
    getLeads(user: any): Promise<({
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
    getLead(user: any, id: string): Promise<({
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
    createLead(user: any, dto: CreateLeadDto): Promise<{
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
    updateLead(user: any, id: string, dto: UpdateLeadDto): Promise<{
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
    deleteLead(user: any, id: string): Promise<{
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
