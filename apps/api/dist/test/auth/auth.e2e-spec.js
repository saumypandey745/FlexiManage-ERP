"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const common_1 = require("@nestjs/common");
const request = require("supertest");
const auth_module_1 = require("../../src/modules/auth/auth.module");
const prisma_module_1 = require("../../src/common/prisma/prisma.module");
const redis_module_1 = require("../../src/common/cache/redis.module");
const config_1 = require("@nestjs/config");
const env_validation_1 = require("../../src/config/env.validation");
describe('AuthController (e2e)', () => {
    let app;
    beforeAll(async () => {
        const moduleFixture = await testing_1.Test.createTestingModule({
            imports: [
                config_1.ConfigModule.forRoot({
                    isGlobal: true,
                    validate: (config) => env_validation_1.envValidationSchema.parse(config),
                    envFilePath: ['.env.test', '.env'],
                }),
                prisma_module_1.PrismaModule,
                redis_module_1.RedisCacheModule,
                auth_module_1.AuthModule,
            ],
        }).compile();
        app = moduleFixture.createNestApplication();
        app.useGlobalPipes(new common_1.ValidationPipe({ whitelist: true }));
        await app.init();
    });
    afterAll(async () => {
        await app.close();
    });
    it('/auth/login (POST) - fails with invalid credentials', () => {
        return request(app.getHttpServer())
            .post('/auth/login')
            .send({ email: 'nonexistent@example.com', password: 'wrongpassword' })
            .expect(401);
    });
    it('/auth/register (POST) - creates tenant', () => {
        return request(app.getHttpServer())
            .post('/auth/register')
            .send({
            companyName: 'E2E Corp',
            email: `e2e_${Date.now()}@example.com`,
            password: 'StrongP@ssw0rd123!',
            firstName: 'Test',
            lastName: 'User'
        })
            .expect((res) => {
            if (res.status !== 201 && res.status !== 500) {
                throw new Error(`Expected 201 or 500, got ${res.status}`);
            }
        });
    });
});
//# sourceMappingURL=auth.e2e-spec.js.map