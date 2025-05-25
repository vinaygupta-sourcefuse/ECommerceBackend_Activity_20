import {
  post, get, patch, put, del,
  param, requestBody, response,
  HttpErrors
} from '@loopback/rest';
import axios from 'axios';

const BASE_URL = 'http://localhost:3023';

export class CartFacadeController {
  @post('/carts')
  @response(200, {
    description: 'Proxy: Create Cart',
  })
  async createCart(@requestBody() cart: object): Promise<object> {
    try {
      const response = await axios.post(`${BASE_URL}/carts`, cart);
      return response.data;
    } catch (err) {
      console.error('Error creating cart:', err.message);
      throw new HttpErrors.InternalServerError('Cart creation failed via proxy');
    }
  }

  @get('/carts/count')
  @response(200, {
    description: 'Proxy: Cart Count',
  })
  async countCart(): Promise<object> {
    try {
      const response = await axios.get(`${BASE_URL}/carts/count`);
      return response.data;
    } catch (err) {
      console.error('Error counting carts:', err.message);
      throw new HttpErrors.InternalServerError('Cart count failed via proxy');
    }
  }

  @get('/carts')
  @response(200, {
    description: 'Proxy: Find Carts',
  })
  async findCarts(): Promise<object[]> {
    try {
      const response = await axios.get(`${BASE_URL}/carts`);
      return response.data;
    } catch (err) {
      console.error('Error finding carts:', err.message);
      throw new HttpErrors.InternalServerError('Fetching carts failed via proxy');
    }
  }

  @patch('/carts')
  @response(200, {
    description: 'Proxy: Patch All Carts',
  })
  async updateAllCarts(@requestBody() cart: object): Promise<object> {
    try {
      const response = await axios.patch(`${BASE_URL}/carts`, cart);
      return response.data;
    } catch (err) {
      console.error('Error patching carts:', err.message);
      throw new HttpErrors.InternalServerError('Patch all carts failed via proxy');
    }
  }

  @get('/carts/{id}')
  @response(200, {
    description: 'Proxy: Find Cart by ID',
  })
  async findCartById(@param.path.string('id') id: string): Promise<object> {
    try {
      const response = await axios.get(`${BASE_URL}/carts/${id}`);
      return response.data;
    } catch (err) {
      console.error(`Error finding cart with ID ${id}:`, err.message);
      throw new HttpErrors.NotFound(`Cart with ID ${id} not found via proxy`);
    }
  }

  @patch('/carts/{id}')
  @response(204, {
    description: 'Proxy: Patch Cart by ID',
  })
  async updateCartById(
    @param.path.string('id') id: string,
    @requestBody() cart: object,
  ): Promise<void> {
    try {
      await axios.patch(`${BASE_URL}/carts/${id}`, cart);
    } catch (err) {
      console.error(`Error updating cart with ID ${id}:`, err.message);
      throw new HttpErrors.InternalServerError('Update by ID failed via proxy');
    }
  }

  @put('/carts/{id}')
  @response(204, {
    description: 'Proxy: Replace Cart by ID',
  })
  async replaceCartById(
    @param.path.string('id') id: string,
    @requestBody() cart: object,
  ): Promise<void> {
    try {
      await axios.put(`${BASE_URL}/carts/${id}`, cart);
    } catch (err) {
      console.error(`Error replacing cart with ID ${id}:`, err.message);
      throw new HttpErrors.InternalServerError('Replace by ID failed via proxy');
    }
  }

  @del('/carts/{id}')
  @response(204, {
    description: 'Proxy: Delete Cart by ID',
  })
  async deleteCartById(@param.path.string('id') id: string): Promise<void> {
    try {
      await axios.delete(`${BASE_URL}/carts/${id}`);
    } catch (err) {
      console.error(`Error deleting cart with ID ${id}:`, err.message);
      throw new HttpErrors.InternalServerError('Delete by ID failed via proxy');
    }
  }
}
