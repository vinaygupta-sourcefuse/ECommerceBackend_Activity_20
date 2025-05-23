import {Client, expect} from '@loopback/testlab';
import {CategoryApplication} from '../../';
import {setupApplication} from './test-helper';
import {CategoryRepository} from '../../repositories';
import {Category} from '../../models';

describe('CategoryController', () => {
  let app: CategoryApplication;
  let client: Client;
  let categoryRepo: CategoryRepository;
  let testCategories: Category[];

  before('setupApplication', async () => {
    ({app, client} = await setupApplication());
    categoryRepo = await app.getRepository(CategoryRepository);
  });

  after(async () => {
    await app.stop();
  });

  beforeEach(async () => {
    await categoryRepo.deleteAll();
    testCategories = await Promise.all([
      categoryRepo.create({name: 'Electronics', description: 'Gadgets', imageUrl: 'http://example.com/electronics.jpg'}),
      categoryRepo.create({name: 'Books', description: 'Fiction & Non-fiction'}),
    ]);
  });

  // POST /categories
  describe('POST /categories', () => {
    it('creates a new category', async () => {
      const newCategory = {
        name: 'Clothing',
        description: 'Men and Women Fashion',
        imageUrl: 'http://example.com/clothing.jpg',
      };
      const res = await client.post('/categories').send(newCategory).expect(200);
      expect(res.body).to.containDeep(newCategory);
      expect(res.body).to.have.property('id');

      const created = await categoryRepo.findById(res.body.id);
      expect(created).to.containDeep(newCategory);
    });

    it('rejects creation without required field `name`', async () => {
      await client.post('/categories').send({description: 'Invalid'}).expect(422);
    });
  });

  // GET /categories
  describe('GET /categories', () => {
    it('returns all categories', async () => {
      const res = await client.get('/categories').expect(200);
      expect(res.body).to.be.Array();
      expect(res.body.length).to.eql(testCategories.length);
    });

    it('supports filter by name', async () => {
      const res = await client
        .get('/categories')
        .query({filter: {where: {name: 'Books'}}})
        .expect(200);
      expect(res.body.length).to.equal(1);
      expect(res.body[0].name).to.equal('Books');
    });
  });

  // GET /categories/count
  describe('GET /categories/count', () => {
    it('returns the count of categories', async () => {
      const res = await client.get('/categories/count').expect(200);
      expect(res.body.count).to.eql(testCategories.length);
    });

    it('returns filtered count', async () => {
      const res = await client.get('/categories/count').query({
        where: {name: 'Electronics'},
      }).expect(200);
      expect(res.body.count).to.equal(1);
    });
  });

  // GET /categories/{id}
  describe('GET /categories/{id}', () => {
    it('returns a category by id', async () => {
      const category = testCategories[0];
      const res = await client.get(`/categories/${category.id}`).expect(200);
      expect(res.body).to.containDeep(category);
    });

    it('returns 404 if category not found', async () => {
      await client.get('/categories/999999').expect(404);
    });
  });

  // PATCH /categories/{id}
  describe('PATCH /categories/{id}', () => {
    it('updates a category partially', async () => {
      const category = testCategories[0];
      const patch = {description: 'Updated description'};
      await client.patch(`/categories/${category.id}`).send(patch).expect(204);

      const updated = await categoryRepo.findById(category.id);
      expect(updated.description).to.eql(patch.description);
    });

    it('returns 404 for non-existent ID', async () => {
      await client.patch('/categories/999999').send({name: 'Invalid'}).expect(404);
    });
  });

  // PATCH /categories (bulk)
  describe('PATCH /categories', () => {
    it('updates multiple categories', async () => {
      const res = await client
        .patch('/categories')
        .send({description: 'Bulk updated'})
        .query({where: {name: 'Books'}})
        .expect(200);

      expect(res.body.count).to.equal(1);
      const updated = await categoryRepo.find({where: {name: 'Books'}});
      expect(updated[0].description).to.equal('Bulk updated');
    });
  });

  // PUT /categories/{id}
  describe('PUT /categories/{id}', () => {
    it('replaces an entire category', async () => {
      const category = testCategories[0];
      const replacement = {
        id: category.id,
        name: 'Replaced Category',
        description: 'New Desc',
        imageUrl: 'http://example.com/new.jpg',
      };
      await client.put(`/categories/${category.id}`).send(replacement).expect(204);
      const replaced = await categoryRepo.findById(category.id);
      expect(replaced).to.containDeep(replacement);
    });

    it('returns 422 if required fields are missing', async () => {
      const category = testCategories[0];
      await client.put(`/categories/${category.id}`).send({}).expect(422);
    });
  });

  // DELETE /categories/{id}
  describe('DELETE /categories/{id}', () => {
    it('deletes a category by id', async () => {
      const category = testCategories[0];
      await client.del(`/categories/${category.id}`).expect(204);
      await client.get(`/categories/${category.id}`).expect(404);
    });

    it('returns 404 when trying to delete non-existent category', async () => {
      await client.del('/categories/999999').expect(404);
    });
  });
});
