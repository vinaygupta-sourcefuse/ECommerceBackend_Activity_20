import {
  post, get, patch, put, del,
  param, requestBody, response,
  HttpErrors,
} from '@loopback/rest';
import axios from 'axios';

const BASE_URL = 'http://localhost:3021';

export class ProductFacadeController {
  @post('/products')
  @response(200, {
    description: 'Proxy: Create Product',
  })
  async createProduct(@requestBody() product: object): Promise<object> {
    try {
      const res = await axios.post(`${BASE_URL}/products`, product);
      return res.data;
    } catch (error) {
      console.error('Create Product failed:', error.message);
      throw new HttpErrors.InternalServerError('Failed to create product');
    }
  }

  @get('/products/count')
  @response(200, {
    description: 'Proxy: Product count',
  })
  async countProducts(): Promise<object> {
    try {
      const res = await axios.get(`${BASE_URL}/products/count`);
      return res.data;
    } catch (error) {
      console.error('Count Products failed:', error.message);
      throw new HttpErrors.InternalServerError('Failed to count products');
    }
  }

  @get('/products')
  @response(200, {
    description: 'Proxy: Get all Products',
  })
  async findProducts(): Promise<object[]> {
    try {
      const res = await axios.get(`${BASE_URL}/products`);
      return res.data;
    } catch (error) {
      console.error('Find Products failed:', error.message);
      throw new HttpErrors.InternalServerError('Failed to fetch products');
    }
  }

  @patch('/products')
  @response(200, {
    description: 'Proxy: Patch all Products',
  })
  async updateAllProducts(@requestBody() product: object): Promise<object> {
    try {
      const res = await axios.patch(`${BASE_URL}/products`, product);
      return res.data;
    } catch (error) {
      console.error('Update All Products failed:', error.message);
      throw new HttpErrors.InternalServerError('Failed to update products');
    }
  }

  @get('/products/{id}')
  @response(200, {
    description: 'Proxy: Find Product by ID',
  })
  async findProductById(@param.path.string('id') id: string): Promise<object> {
    try {
      const res = await axios.get(`${BASE_URL}/products/${id}`);
      return res.data;
    } catch (error) {
      console.error(`Find Product by ID ${id} failed:`, error.message);
      throw new HttpErrors.NotFound('Product not found');
    }
  }

  @patch('/products/{id}')
  @response(204, {
    description: 'Proxy: Patch Product by ID',
  })
  async updateProductById(
    @param.path.string('id') id: string,
    @requestBody() product: object,
  ): Promise<void> {
    try {
      await axios.patch(`${BASE_URL}/products/${id}`, product);
    } catch (error) {
      console.error(`Patch Product by ID ${id} failed:`, error.message);
      throw new HttpErrors.InternalServerError('Failed to update product');
    }
  }

  @put('/products/{id}')
  @response(204, {
    description: 'Proxy: Replace Product by ID',
  })
  async replaceProductById(
    @param.path.string('id') id: string,
    @requestBody() product: object,
  ): Promise<void> {
    try {
      await axios.put(`${BASE_URL}/products/${id}`, product);
    } catch (error) {
      console.error(`Replace Product by ID ${id} failed:`, error.message);
      throw new HttpErrors.InternalServerError('Failed to replace product');
    }
  }

  @del('/products/{id}')
  @response(204, {
    description: 'Proxy: Delete Product by ID',
  })
  async deleteProductById(@param.path.string('id') id: string): Promise<void> {
    try {
      await axios.delete(`${BASE_URL}/products/${id}`);
    } catch (error) {
      console.error(`Delete Product by ID ${id} failed:`, error.message);
      throw new HttpErrors.InternalServerError('Failed to delete product');
    }
  }
}
