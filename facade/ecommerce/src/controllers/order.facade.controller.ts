import {
  post, get, patch, put, del,
  param, requestBody, response,
  HttpErrors,
} from '@loopback/rest';
import axios from 'axios';

const BASE_URL = 'http://localhost:3020';

export class OrderFacadeController {
  @post('/orders')
  @response(200, {
    description: 'Proxy: Create Order',
  })
  async createOrder(@requestBody() order: object): Promise<object> {
    try {
      const response = await axios.post(`${BASE_URL}/orders`, order);
      return response.data;
    } catch (error) {
      console.error('Error creating order:', error.message);
      throw new HttpErrors.InternalServerError('Failed to create order');
    }
  }

  @get('/orders/count')
  @response(200, {
    description: 'Proxy: Order Count',
  })
  async countOrders(): Promise<object> {
    try {
      const response = await axios.get(`${BASE_URL}/orders/count`);
      return response.data;
    } catch (error) {
      console.error('Error counting orders:', error.message);
      throw new HttpErrors.InternalServerError('Failed to count orders');
    }
  }

  @get('/orders')
  @response(200, {
    description: 'Proxy: Get All Orders',
  })
  async findOrders(): Promise<object[]> {
    try {
      const response = await axios.get(`${BASE_URL}/orders`);
      return response.data;
    } catch (error) {
      console.error('Error fetching orders:', error.message);
      throw new HttpErrors.InternalServerError('Failed to fetch orders');
    }
  }

  @patch('/orders')
  @response(200, {
    description: 'Proxy: Update All Orders',
  })
  async updateAllOrders(@requestBody() order: object): Promise<object> {
    try {
      const response = await axios.patch(`${BASE_URL}/orders`, order);
      return response.data;
    } catch (error) {
      console.error('Error updating orders:', error.message);
      throw new HttpErrors.InternalServerError('Failed to update orders');
    }
  }

  @get('/orders/{id}')
  @response(200, {
    description: 'Proxy: Find Order by ID',
  })
  async findOrderById(@param.path.string('id') id: string): Promise<object> {
    try {
      const response = await axios.get(`${BASE_URL}/orders/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching order with id ${id}:`, error.message);
      throw new HttpErrors.NotFound('Order not found');
    }
  }

  @patch('/orders/{id}')
  @response(204, {
    description: 'Proxy: Update Order by ID',
  })
  async updateOrderById(
    @param.path.string('id') id: string,
    @requestBody() order: object,
  ): Promise<void> {
    try {
      await axios.patch(`${BASE_URL}/orders/${id}`, order);
    } catch (error) {
      console.error(`Error updating order with id ${id}:`, error.message);
      throw new HttpErrors.InternalServerError('Failed to update order');
    }
  }

  @put('/orders/{id}')
  @response(204, {
    description: 'Proxy: Replace Order by ID',
  })
  async replaceOrderById(
    @param.path.string('id') id: string,
    @requestBody() order: object,
  ): Promise<void> {
    try {
      await axios.put(`${BASE_URL}/orders/${id}`, order);
    } catch (error) {
      console.error(`Error replacing order with id ${id}:`, error.message);
      throw new HttpErrors.InternalServerError('Failed to replace order');
    }
  }

  @del('/orders/{id}')
  @response(204, {
    description: 'Proxy: Delete Order by ID',
  })
  async deleteOrderById(@param.path.string('id') id: string): Promise<void> {
    try {
      await axios.delete(`${BASE_URL}/orders/${id}`);
    } catch (error) {
      console.error(`Error deleting order with id ${id}:`, error.message);
      throw new HttpErrors.InternalServerError('Failed to delete order');
    }
  }
}
