import {Client, expect} from '@loopback/testlab';
import {OrderApplication} from '../../';
import {setupApplication} from './test-helper';
import {OrderRepository} from '../../repositories';
import {Order} from '../../models';

describe('OrderController', () => {
  let app: OrderApplication;
  let client: Client;
  let orderRepo: OrderRepository;
  let order: Order;

  const baseOrder = {
    id: 'ORD001',
    user_id: 'USR123',
    status: 'Pending',
    subtotal: 100,
    taxAmount: 10,
    shippingAmount: 5,
    discountAmount: 0,
    grandTotal: 115,
    user_email: 'user@example.com',
    shippingMethod: 'Standard',
    shippingStatus: 'Not Shipped',
    shippingAddress: '123 Street, City',
    name: 'John Doe',
    phone: '1234567890',
  };

  before('setupApplication', async () => {
    ({app, client} = await setupApplication());
    orderRepo = await app.getRepository(OrderRepository);
  });

  after(async () => {
    await app.stop();
  });

  beforeEach(async () => {
    await orderRepo.deleteAll();
    order = await orderRepo.create(baseOrder);
  });

  // POST /orders
  describe('POST /orders', () => {
    it('creates a new order', async () => {
      const res = await client.post('/orders').send({
        ...baseOrder,
        id: 'ORD002',
        status: 'Confirmed',
      }).expect(200);

      expect(res.body).to.containDeep({id: 'ORD002', status: 'Confirmed'});
      const created = await orderRepo.findById('ORD002');
      expect(created.status).to.equal('Confirmed');
    });

    it('fails to create without required fields', async () => {
      await client.post('/orders').send({status: 'Pending'}).expect(422);
    });

  });

  // GET /orders
  describe('GET /orders', () => {
    it('returns all orders', async () => {
      const res = await client.get('/orders').expect(200);
      expect(res.body).to.be.Array();
      expect(res.body.length).to.eql(1);
    });

    it('supports filter by status', async () => {
      const res = await client.get('/orders').query({
        filter: JSON.stringify({where: {status: 'Pending'}}),
      }).expect(200);

      expect(res.body[0].status).to.equal('Pending');
    });
  });

  // GET /orders/count
  describe('GET /orders/count', () => {
    it('returns the order count', async () => {
      const res = await client.get('/orders/count').expect(200);
      expect(res.body.count).to.equal(1);
    });

    it('returns filtered count', async () => {
      const res = await client.get('/orders/count').query({
        where: {status: 'Pending'},
      }).expect(200);
      expect(res.body.count).to.equal(1);
    });
  });

  // GET /orders/{id}
  describe('GET /orders/{id}', () => {
    it('fetches order by ID', async () => {
      const res = await client.get(`/orders/${order.id}`).expect(200);
      expect(res.body.id).to.equal(order.id);
    });

    it('returns 404 for non-existent ID', async () => {
      await client.get('/orders/INVALID_ID').expect(404);
    });
  });

  // PATCH /orders
  describe('PATCH /orders (bulk)', () => {
    it('updates matching orders', async () => {
      const res = await client.patch('/orders')
        .send({status: 'Processing'})
        .query({where: JSON.stringify({status: 'Pending'})})
        .expect(200);

      expect(res.body.count).to.equal(1);

      const updated = await orderRepo.findById(order.id);
      expect(updated.status).to.equal('Processing');
    });
  });

  // PATCH /orders/{id}
  describe('PATCH /orders/{id}', () => {
    it('updates an order by id', async () => {
      await client.patch(`/orders/${order.id}`)
        .send({shippingStatus: 'Shipped'})
        .expect(204);

      const updated = await orderRepo.findById(order.id);
      expect(updated.shippingStatus).to.equal('Shipped');
    });

    it('returns 404 for non-existent order', async () => {
      await client.patch('/orders/INVALID_ID').send({status: 'Canceled'}).expect(404);
    });
  });

  // PUT /orders/{id}
  describe('PUT /orders/{id}', () => {
    it('replaces an order', async () => {
      const replacement = {...baseOrder, id: order.id, status: 'Delivered'};
      await client.put(`/orders/${order.id}`).send(replacement).expect(204);

      const updated = await orderRepo.findById(order.id);
      expect(updated.status).to.equal('Delivered');
    });

    it('returns 422 if data is incomplete', async () => {
      await client.put(`/orders/${order.id}`).send({id: order.id}).expect(422);
    });
  });

  // DELETE /orders/{id}
  describe('DELETE /orders/{id}', () => {
    it('deletes an order by id', async () => {
      await client.del(`/orders/${order.id}`).expect(204);
      await client.get(`/orders/${order.id}`).expect(404);
    });

    it('returns 404 when trying to delete a non-existent order', async () => {
      await client.del('/orders/INVALID_ID').expect(404);
    });
  });
});
