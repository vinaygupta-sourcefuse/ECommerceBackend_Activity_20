import {Client, expect} from '@loopback/testlab';
import {OrderitemApplication} from '../../';
import {setupApplication} from './test-helper';
import {Orderitem} from '../../models';
import {OrderitemRepository} from '../../repositories';

describe('OrderitemController', () => {
  let app: OrderitemApplication;
  let client: Client;
  let orderitemRepo: OrderitemRepository;

  const sampleOrderitem = {
    id: 'item001',
    productsId: ['prod123', 'prod456'],
  };

  before('setupApplication', async () => {
    ({app, client} = await setupApplication());
    orderitemRepo = await app.getRepository(OrderitemRepository);
  });

  after(async () => {
    await app.stop();
  });

  beforeEach(async () => {
    await orderitemRepo.deleteAll();
    await orderitemRepo.create(sampleOrderitem);
  });

  // POST /orderitems
  describe('POST /orderitems', () => {
    it('creates a new order item', async () => {
      const res = await client.post('/orderitems').send({
        id: 'item002',
        productsId: ['prod789'],
      }).expect(200);

      expect(res.body).to.containDeep({id: 'item002'});
      const found = await orderitemRepo.findById('item002');
      expect(found.productsId).to.deepEqual(['prod789']);
    });

    it('fails to create with missing required fields', async () => {
      await client.post('/orderitems').send({id: 'item003'}).expect(422);
    });

  });

  // GET /orderitems
  describe('GET /orderitems', () => {
    it('lists all order items', async () => {
      const res = await client.get('/orderitems').expect(200);
      expect(res.body).to.be.Array();
      expect(res.body.length).to.be.greaterThan(0);
    });
  });

  // GET /orderitems/count
  describe('GET /orderitems/count', () => {
    it('returns total count', async () => {
      const res = await client.get('/orderitems/count').expect(200);
      expect(res.body.count).to.equal(1);
    });
  });

  // GET /orderitems/{id}
  describe('GET /orderitems/{id}', () => {
    it('returns the order item by ID', async () => {
      const res = await client.get(`/orderitems/${sampleOrderitem.id}`).expect(200);
      expect(res.body.id).to.equal(sampleOrderitem.id);
    });

    it('returns 404 for unknown ID', async () => {
      await client.get('/orderitems/invalid-id').expect(404);
    });
  });

  // PATCH /orderitems/{id}
  describe('PATCH /orderitems/{id}', () => {
    it('updates a field by ID', async () => {
      await client.patch(`/orderitems/${sampleOrderitem.id}`)
        .send({productsId: ['prod999']})
        .expect(204);

      const updated = await orderitemRepo.findById(sampleOrderitem.id);
      expect(updated.productsId).to.deepEqual(['prod999']);
    });
  });

  // PUT /orderitems/{id}
  describe('PUT /orderitems/{id}', () => {
    it('replaces an order item', async () => {
      const replacement = {
        id: sampleOrderitem.id,
        productsId: ['prodX', 'prodY'],
      };
      await client.put(`/orderitems/${sampleOrderitem.id}`).send(replacement).expect(204);

      const found = await orderitemRepo.findById(sampleOrderitem.id);
      expect(found.productsId).to.deepEqual(['prodX', 'prodY']);
    });

    it('fails with incomplete data', async () => {
      await client.put(`/orderitems/${sampleOrderitem.id}`).send({id: sampleOrderitem.id}).expect(422);
    });
  });

  // DELETE /orderitems/{id}
  describe('DELETE /orderitems/{id}', () => {
    it('deletes the order item', async () => {
      await client.del(`/orderitems/${sampleOrderitem.id}`).expect(204);
      await client.get(`/orderitems/${sampleOrderitem.id}`).expect(404);
    });

    it('returns 404 for deleting non-existent ID', async () => {
      await client.del('/orderitems/non-existent').expect(404);
    });
  });

  // PATCH /orderitems (bulk)
  describe('PATCH /orderitems (bulk update)', () => {
    it('bulk updates multiple items', async () => {
      await client.patch('/orderitems')
        .send({productsId: ['updated']})
        .expect(200);

      const items = await orderitemRepo.find();
      for (const item of items) {
        expect(item.productsId).to.deepEqual(['updated']);
      }
    });
  });
});
