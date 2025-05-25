import {
  post, get, patch, put, del,
  param, requestBody, response,
  HttpErrors,
} from '@loopback/rest';
import axios from 'axios';

const BASE_URL = 'http://localhost:3019';

export class OrderItemFacadeController {
  @post('/orderitems')
  @response(200, {
    description: 'Proxy: Create OrderItem',
  })
  async createOrderItem(@requestBody() orderitem: object): Promise<object> {
    try {
      const response = await axios.post(`${BASE_URL}/orderitems`, orderitem);
      return response.data;
    } catch (error) {
      console.error('Error creating order item:', error.message);
      throw new HttpErrors.InternalServerError('Failed to create order item');
    }
  }

  @get('/orderitems/count')
  @response(200, {
    description: 'Proxy: OrderItem Count',
  })
  async countOrderItems(): Promise<object> {
    try {
      const response = await axios.get(`${BASE_URL}/orderitems/count`);
      return response.data;
    } catch (error) {
      console.error('Error counting order items:', error.message);
      throw new HttpErrors.InternalServerError('Failed to count order items');
    }
  }

  @get('/orderitems')
  @response(200, {
    description: 'Proxy: Get All OrderItems',
  })
  async findOrderItems(): Promise<object[]> {
    try {
      const response = await axios.get(`${BASE_URL}/orderitems`);
      return response.data;
    } catch (error) {
      console.error('Error fetching order items:', error.message);
      throw new HttpErrors.InternalServerError('Failed to fetch order items');
    }
  }

  @patch('/orderitems')
  @response(200, {
    description: 'Proxy: Update All OrderItems',
  })
  async updateAllOrderItems(@requestBody() orderitem: object): Promise<object> {
    try {
      const response = await axios.patch(`${BASE_URL}/orderitems`, orderitem);
      return response.data;
    } catch (error) {
      console.error('Error updating order items:', error.message);
      throw new HttpErrors.InternalServerError('Failed to update order items');
    }
  }

  @get('/orderitems/{id}')
  @response(200, {
    description: 'Proxy: Get OrderItem by ID',
  })
  async findOrderItemById(@param.path.string('id') id: string): Promise<object> {
    try {
      const response = await axios.get(`${BASE_URL}/orderitems/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching order item with id ${id}:`, error.message);
      throw new HttpErrors.NotFound('Order item not found');
    }
  }

  @patch('/orderitems/{id}')
  @response(204, {
    description: 'Proxy: Update OrderItem by ID',
  })
  async updateOrderItemById(
    @param.path.string('id') id: string,
    @requestBody() orderitem: object,
  ): Promise<void> {
    try {
      await axios.patch(`${BASE_URL}/orderitems/${id}`, orderitem);
    } catch (error) {
      console.error(`Error updating order item with id ${id}:`, error.message);
      throw new HttpErrors.InternalServerError('Failed to update order item');
    }
  }

  @put('/orderitems/{id}')
  @response(204, {
    description: 'Proxy: Replace OrderItem by ID',
  })
  async replaceOrderItemById(
    @param.path.string('id') id: string,
    @requestBody() orderitem: object,
  ): Promise<void> {
    try {
      await axios.put(`${BASE_URL}/orderitems/${id}`, orderitem);
    } catch (error) {
      console.error(`Error replacing order item with id ${id}:`, error.message);
      throw new HttpErrors.InternalServerError('Failed to replace order item');
    }
  }

  @del('/orderitems/{id}')
  @response(204, {
    description: 'Proxy: Delete OrderItem by ID',
  })
  async deleteOrderItemById(@param.path.string('id') id: string): Promise<void> {
    try {
      await axios.delete(`${BASE_URL}/orderitems/${id}`);
    } catch (error) {
      console.error(`Error deleting order item with id ${id}:`, error.message);
      throw new HttpErrors.InternalServerError('Failed to delete order item');
    }
  }
}
