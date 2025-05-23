import {Client, expect} from '@loopback/testlab';
import {ProductApplication} from '../../';
import {setupApplication} from './test-helper';
import {Product} from '../../models';
import {ProductRepository} from '../../repositories';

describe('ProductController', () => {
  let app: ProductApplication;
  let client: Client;
  let productRepo: ProductRepository;

  const sampleProduct: Product = new Product({
    id: 'prod-001',
    name: 'Test Product',
    description: 'Functional test item',
    price: 100,
    discount: 10,
    images: ['img1.jpg'],
    categoryId: 'cat-001',
    brandId: 'brand-001',
    stock: 50,
  });

  before('setupApplication', async () => {
    ({app, client} = await setupApplication());
    productRepo = await app.getRepository(ProductRepository);
  });

  after(async () => {
    await app.stop();
  });

  beforeEach(async () => {
    await productRepo.deleteAll();
    await productRepo.create(sampleProduct);
  });

  // POST /products
  describe('POST /products', () => {
    it('creates a product', async () => {
      const res = await client.post('/products').send({
        ...sampleProduct,
        id: 'prod-002',
        name: 'New Product',
      }).expect(200);
      expect(res.body).to.containDeep({id: 'prod-002', name: 'New Product'});
    });

    it('fails on missing required fields', async () => {
      await client.post('/products').send({id: 'prod-003'}).expect(422);
    });

  });

  // GET /products
  describe('GET /products', () => {
    it('returns all products', async () => {
      const res = await client.get('/products').expect(200);
      expect(res.body).to.be.Array();
      expect(res.body.length).to.be.greaterThan(0);
    });
  });

  // GET /products/count
  describe('GET /products/count', () => {
    it('returns product count', async () => {
      const res = await client.get('/products/count').expect(200);
      expect(res.body.count).to.equal(1);
    });
  });

  // GET /products/{id}
  describe('GET /products/{id}', () => {
    it('fetches product by ID', async () => {
      const res = await client.get(`/products/${sampleProduct.id}`).expect(200);
      expect(res.body).to.containDeep({id: sampleProduct.id});
    });

    it('returns 404 for invalid product ID', async () => {
      await client.get('/products/invalid-id').expect(404);
    });
  });

  // PATCH /products/{id}
  describe('PATCH /products/{id}', () => {
    it('updates product fields', async () => {
      await client.patch(`/products/${sampleProduct.id}`).send({
        price: 120,
      }).expect(204);

      const updated = await productRepo.findById(sampleProduct.id);
      expect(updated.price).to.equal(120);
    });
  });

  // PUT /products/{id}
  describe('PUT /products/{id}', () => {
    it('replaces a product', async () => {
      const replacement = {
        ...sampleProduct,
        name: 'Replaced Product',
        price: 200,
      };

      await client.put(`/products/${sampleProduct.id}`).send(replacement).expect(204);

      const updated = await productRepo.findById(sampleProduct.id);
      expect(updated.name).to.equal('Replaced Product');
      expect(updated.price).to.equal(200);
    });

    it('fails when incomplete data provided', async () => {
      await client.put(`/products/${sampleProduct.id}`).send({id: sampleProduct.id}).expect(422);
    });
  });

  // DELETE /products/{id}
  describe('DELETE /products/{id}', () => {
    it('deletes the product', async () => {
      await client.del(`/products/${sampleProduct.id}`).expect(204);
      await client.get(`/products/${sampleProduct.id}`).expect(404);
    });

    it('handles deletion of non-existent product', async () => {
      await client.del('/products/non-existent').expect(404);
    });
  });

  // PATCH /products (bulk update)
  describe('PATCH /products', () => {
    it('bulk updates products', async () => {
      await client.patch('/products').send({discount: 15}).expect(200);

      const updatedProducts = await productRepo.find();
      for (const product of updatedProducts) {
        expect(product.discount).to.equal(15);
      }
    });
  });
});
