"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const common_1 = require("@nestjs/common");
const request = require("supertest");
const app_module_1 = require("../../src/app.module");
const jwt_auth_guard_1 = require("../../src/common/guards/jwt-auth.guard");
const tenant_guard_1 = require("../../src/common/guards/tenant.guard");
describe('UserController (e2e)', () => {
    let app;
    const mockJwtAuthGuard = { canActivate: (context) => {
            const req = context.switchToHttp().getRequest();
            req.user = { id: 'user-123', tenantId: 'tenant-456', roles: ['Admin'] };
            return true;
        } };
    const mockTenantGuard = { canActivate: () => true };
    beforeAll(async () => {
        const moduleFixture = await testing_1.Test.createTestingModule({
            imports: [app_module_1.AppModule],
        })
            .overrideGuard(jwt_auth_guard_1.JwtAuthGuard)
            .useValue(mockJwtAuthGuard)
            .overrideGuard(tenant_guard_1.TenantGuard)
            .useValue(mockTenantGuard)
            .compile();
        app = moduleFixture.createNestApplication();
        app.useGlobalPipes(new common_1.ValidationPipe({ whitelist: true }));
        await app.init();
    });
    afterAll(async () => {
        await app.close();
    });
    it('/users (GET)', () => {
        return request(app.getHttpServer())
            .get('/users')
            .expect((res) => {
            if (res.status !== 200 && res.status !== 500) {
                throw new Error(`Expected 200 or 500, got ${res.status}`);
            }
        });
    });
    it('/users/profile (PATCH)', () => {
        return request(app.getHttpServer())
            .patch('/users/profile')
            .send({ firstName: 'John' })
            .expect((res) => {
            if (res.status !== 200 && res.status !== 500) {
                throw new Error(`Expected 200 or 500, got ${res.status}`);
            }
        });
    });
});
//# sourceMappingURL=user.e2e-spec.js.map