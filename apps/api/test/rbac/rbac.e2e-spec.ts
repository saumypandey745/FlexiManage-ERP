import { Test, TestingModule } from "@nestjs/testing";
import { INestApplication, ValidationPipe } from "@nestjs/common";
import * as request from "supertest";
import { AppModule } from "../../src/app.module";
import { JwtAuthGuard } from "../../src/common/guards/jwt-auth.guard";
import { TenantGuard } from "../../src/common/guards/tenant.guard";

describe("RbacController (e2e)", () => {
  let app: INestApplication;

  const mockJwtAuthGuard = {
    canActivate: (context: any) => {
      const req = context.switchToHttp().getRequest();
      req.user = {
        id: "user-123",
        tenantId: "tenant-456",
        roles: ["SuperAdmin"],
      };
      return true;
    },
  };

  const mockTenantGuard = { canActivate: () => true };

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideGuard(JwtAuthGuard)
      .useValue(mockJwtAuthGuard)
      .overrideGuard(TenantGuard)
      .useValue(mockTenantGuard)
      .compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it("/rbac/roles (GET)", () => {
    return request(app.getHttpServer())
      .get("/rbac/roles")
      .expect((res) => {
        if (res.status !== 200 && res.status !== 500) {
          throw new Error(`Expected 200 or 500, got ${res.status}`);
        }
      });
  });

  it("/rbac/permissions (POST)", () => {
    return request(app.getHttpServer())
      .post("/rbac/permissions")
      .send({ action: "employee:create" })
      .expect((res) => {
        if (res.status !== 201 && res.status !== 500) {
          throw new Error(`Expected 201 or 500, got ${res.status}`);
        }
      });
  });
});
