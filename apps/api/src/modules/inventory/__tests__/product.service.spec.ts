import { Test, TestingModule } from '@nestjs/testing';
import { ProductService } from '../services/product.service';
import { ProductRepository } from '../repositories/product.repository';
import { PrismaService } from '../../../common/prisma/prisma.service';
import { BaseException } from '../../../common/exceptions/base.exception';

describe('ProductService', () => {
  let service: ProductService;
  let repo: any;
  let prisma: any;

  beforeEach(async () => {
    repo = {
      findProducts: jest.fn(),
      findById: jest.fn(),
      createProduct: jest.fn(),
      updateProduct: jest.fn(),
      deleteProduct: jest.fn(),
    };

    prisma = {
      auditLog: {
        create: jest.fn(),
      },
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductService,
        { provide: ProductRepository, useValue: repo },
        { provide: PrismaService, useValue: prisma },
      ],
    }).compile();

    service = module.get<ProductService>(ProductService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return products', async () => {
      repo.findProducts.mockResolvedValue([]);
      const result = await service.findAll('t1');
      expect(result).toEqual([]);
      expect(repo.findProducts).toHaveBeenCalledWith('t1');
    });
  });

  describe('findOne', () => {
    it('should return a product if found', async () => {
      repo.findById.mockResolvedValue({ id: 'p1' });
      const result = await service.findOne('t1', 'p1');
      expect(result).toEqual({ id: 'p1' });
    });

    it('should throw if not found', async () => {
      repo.findById.mockResolvedValue(null);
      await expect(service.findOne('t1', 'p1')).rejects.toThrow(BaseException);
    });
  });

  describe('create', () => {
    it('should create product and log audit', async () => {
      repo.createProduct.mockResolvedValue({ id: 'p1', sku: 'SKU1' });
      
      const dto = { sku: 'SKU1', name: 'Product 1', price: 100 };
      const result = await service.create('t1', 'u1', dto);
      
      expect(result).toEqual({ id: 'p1', sku: 'SKU1' });
      expect(repo.createProduct).toHaveBeenCalledWith('t1', dto);
      expect(prisma.auditLog.create).toHaveBeenCalled();
    });
  });

  describe('update', () => {
    it('should update product if exists', async () => {
      repo.findById.mockResolvedValue({ id: 'p1' });
      repo.updateProduct.mockResolvedValue({ id: 'p1', name: 'Updated' });
      
      const result = await service.update('t1', 'p1', 'u1', { name: 'Updated' });
      expect(result.name).toBe('Updated');
      expect(prisma.auditLog.create).toHaveBeenCalled();
    });
  });

  describe('delete', () => {
    it('should delete product if exists', async () => {
      repo.findById.mockResolvedValue({ id: 'p1' });
      repo.deleteProduct.mockResolvedValue(true);
      
      const result = await service.delete('t1', 'p1', 'u1');
      expect(result.success).toBe(true);
      expect(prisma.auditLog.create).toHaveBeenCalled();
    });
  });
});
