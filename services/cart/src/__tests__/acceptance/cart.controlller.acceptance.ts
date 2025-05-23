import {Client, expect} from '@loopback/testlab';
import {CartApplication} from '../../';
import {setupApplication} from './test-helper';
import {CartRepository} from '../../repositories';
import {Cart} from '../../models';


describe('CartController', () => {
  let app: CartApplication;
  let client: Client;
  let cartRepo: CartRepository;
  let testCarts: Cart[];

  before('setupApplication', async () => {
    ({app, client} = await setupApplication());
    cartRepo = await app.getRepository(CartRepository);
  });

  after(async () => {
    await app.stop();
  });

  beforeEach(async () => {
    await cartRepo.deleteAll();
    testCarts = await Promise.all([
      cartRepo.create({
        id: 'cart1',
        userId: 'user1',
        productsId: ['prod1', 'prod2'],
      }),
      cartRepo.create({
        id: 'cart2',
        userId: 'user2',
        productsId: ['prod3'],
      }),
    ]);
  });

  describe('POST /carts', () => {
    it('creates a new cart', async () => {
      const newCart = {
        id: 'cart4',
        userId: 'user4',
        productsId: ['prod5', 'prod6'],
      };
      const res = await client.post('/carts').send(newCart).expect(200);
      expect(res.body).to.containDeep(newCart);

      const saved = await cartRepo.findById(newCart.id);
      expect(saved).to.containDeep(newCart);
    });

    it('rejects with missing required fields', async () => {
      await client.post('/carts').send({}).expect(422);
    });

  });

  describe('GET /carts', () => {
    it('returns all carts', async () => {
      const res = await client.get('/carts').expect(200);
      expect(res.body.length).to.equal(testCarts.length);
    });

    it('supports filtering by userId', async () => {
      const res = await client.get('/carts').query({
        filter: {where: {userId: 'user1'}},
      }).expect(200);
      expect(res.body.length).to.equal(1);
      expect(res.body[0].userId).to.equal('user1');
    });

    it('supports pagination', async () => {
      const res = await client.get('/carts').query({
        filter: {limit: 1},
      }).expect(200);
      expect(res.body.length).to.equal(1);
    });
  });

  describe('GET /carts/{id}', () => {
    it('retrieves a cart by ID', async () => {
      const cart = testCarts[0];
      const res = await client.get(`/carts/${cart.id}`).expect(200);
      expect(res.body).to.containDeep(cart);
    });

    it('returns 404 if cart not found', async () => {
      await client.get('/carts/nonexistent').expect(404);
    });
  });

  describe('PATCH /carts/{id}', () => {
    it('updates specific fields of a cart', async () => {
      const update = {productsId: ['updatedProd']};
      await client.patch(`/carts/${testCarts[0].id}`).send(update).expect(204);
      const updated = await cartRepo.findById(testCarts[0].id);
      expect(updated.productsId).to.deepEqual(update.productsId);
    });

    it('returns 404 on non-existent cart', async () => {
      await client.patch('/carts/invalidId').send({userId: 'x'}).expect(404);
    });
  });

  describe('PUT /carts/{id}', () => {
    it('replaces a cart completely', async () => {
      const replacement = {
        id: testCarts[0].id,
        userId: 'userNew',
        productsId: ['newProd'],
      };
      await client.put(`/carts/${testCarts[0].id}`).send(replacement).expect(204);
      const replaced = await cartRepo.findById(testCarts[0].id);
      expect(replaced).to.containDeep(replacement);
    });

    it('returns 422 when required fields are missing', async () => {
      await client.put(`/carts/${testCarts[0].id}`).send({}).expect(422);
    });
  });

  describe('DELETE /carts/{id}', () => {
    it('deletes a cart by id', async () => {
      const id = testCarts[0].id;
      await client.del(`/carts/${id}`).expect(204);
      await client.get(`/carts/${id}`).expect(404);
    });

    it('returns 404 when deleting non-existent cart', async () => {
      await client.del('/carts/doesNotExist').expect(404);
    });
  });

  describe('GET /carts/count', () => {
    it('returns total number of carts', async () => {
      const res = await client.get('/carts/count').expect(200);
      expect(res.body.count).to.equal(testCarts.length);
    });

    it('returns filtered count', async () => {
      const res = await client.get('/carts/count').query({
        where: {userId: 'user1'},
      }).expect(200);
      expect(res.body.count).to.equal(1);
    });
  });
});
