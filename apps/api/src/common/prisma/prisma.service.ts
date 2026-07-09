import {
  Injectable,
  OnModuleInit,
  OnModuleDestroy,
  Logger,
} from "@nestjs/common";
import { PrismaClient } from "@prisma/client";

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  private readonly logger = new Logger(PrismaService.name);

  constructor() {
    super({
      log: ["warn", "error"],
    });
  }

  async onModuleInit() {
    await this.$connect();
    this.logger.log("Prisma connected successfully.");
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }

  // Tenant isolation is enforced via application-level dependency injection
  // or middleware hooks depending on the module's requirements.
}
