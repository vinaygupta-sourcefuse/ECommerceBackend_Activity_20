import {
  post, get, patch, put, del,
  param, requestBody, response,
  HttpErrors,
} from '@loopback/rest';
import axios from 'axios';

const BASE_URL = 'http://localhost:3022';

export class CategoryFacadeController {
  @post('/categories')
  @response(200, {
    description: 'Proxy: Create Category',
  })
  async createCategory(@requestBody() category: object): Promise<object> {
    try {
      const response = await axios.post(`${BASE_URL}/categories`, category);
      return response.data;
    } catch (error) {
      console.error('Error creating category:', error.message);
      throw new HttpErrors.InternalServerError('Failed to create category');
    }
  }

  @get('/categories/count')
  @response(200, {
    description: 'Proxy: Category Count',
  })
  async countCategories(): Promise<object> {
    try {
      const response = await axios.get(`${BASE_URL}/categories/count`);
      return response.data;
    } catch (error) {
      console.error('Error counting categories:', error.message);
      throw new HttpErrors.InternalServerError('Failed to count categories');
    }
  }

  @get('/categories')
  @response(200, {
    description: 'Proxy: Get All Categories',
  })
  async findCategories(): Promise<object[]> {
    try {
      const response = await axios.get(`${BASE_URL}/categories`);
      return response.data;
    } catch (error) {
      console.error('Error fetching categories:', error.message);
      throw new HttpErrors.InternalServerError('Failed to fetch categories');
    }
  }

  @patch('/categories')
  @response(200, {
    description: 'Proxy: Update All Categories',
  })
  async updateAllCategories(@requestBody() category: object): Promise<object> {
    try {
      const response = await axios.patch(`${BASE_URL}/categories`, category);
      return response.data;
    } catch (error) {
      console.error('Error updating categories:', error.message);
      throw new HttpErrors.InternalServerError('Failed to update categories');
    }
  }

  @get('/categories/{id}')
  @response(200, {
    description: 'Proxy: Find Category by ID',
  })
  async findCategoryById(@param.path.number('id') id: number): Promise<object> {
    try {
      const response = await axios.get(`${BASE_URL}/categories/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching category with id ${id}:`, error.message);
      throw new HttpErrors.NotFound('Category not found');
    }
  }

  @patch('/categories/{id}')
  @response(204, {
    description: 'Proxy: Update Category by ID',
  })
  async updateCategoryById(
    @param.path.number('id') id: number,
    @requestBody() category: object,
  ): Promise<void> {
    try {
      await axios.patch(`${BASE_URL}/categories/${id}`, category);
    } catch (error) {
      console.error(`Error updating category with id ${id}:`, error.message);
      throw new HttpErrors.InternalServerError('Failed to update category');
    }
  }

  @put('/categories/{id}')
  @response(204, {
    description: 'Proxy: Replace Category by ID',
  })
  async replaceCategoryById(
    @param.path.number('id') id: number,
    @requestBody() category: object,
  ): Promise<void> {
    try {
      await axios.put(`${BASE_URL}/categories/${id}`, category);
    } catch (error) {
      console.error(`Error replacing category with id ${id}:`, error.message);
      throw new HttpErrors.InternalServerError('Failed to replace category');
    }
  }

  @del('/categories/{id}')
  @response(204, {
    description: 'Proxy: Delete Category by ID',
  })
  async deleteCategoryById(@param.path.number('id') id: number): Promise<void> {
    try {
      await axios.delete(`${BASE_URL}/categories/${id}`);
    } catch (error) {
      console.error(`Error deleting category with id ${id}:`, error.message);
      throw new HttpErrors.InternalServerError('Failed to delete category');
    }
  }
}
