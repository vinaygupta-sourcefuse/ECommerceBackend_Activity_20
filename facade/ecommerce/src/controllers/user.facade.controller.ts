import {
  post, get, patch, put, del,
  param, requestBody, response,
  HttpErrors
} from '@loopback/rest';
import {inject} from '@loopback/core';
import axios, {AxiosInstance} from 'axios';

export class UserFacadeController {
  protected axiosClient: AxiosInstance;

  constructor() {
    this.axiosClient = axios.create();
  }

  private baseUrl = 'http://localhost:3011';

  @post('/users')
  async createUser(@requestBody() user: object): Promise<object> {
    try {
      const res = await this.axiosClient.post(`${this.baseUrl}/users`, user);
      return res.data;
    } catch (err: any) {
      console.error('Create User Error:', err.message);
      throw new HttpErrors.InternalServerError('Failed to create user via facade');
    }
  }

  @get('/users')
  async findUsers(): Promise<object[]> {
    try {
      const res = await this.axiosClient.get(`${this.baseUrl}/users`);
      return res.data;
    } catch (err: any) {
      console.error('Find Users Error:', err.message);
      throw new HttpErrors.InternalServerError('Failed to fetch users via facade');
    }
  }

  @get('/users/count')
  async getUserCount(): Promise<object> {
    try {
      const res = await this.axiosClient.get(`${this.baseUrl}/users/count`);
      return res.data;
    } catch (err: any) {
      console.error('Count Users Error:', err.message);
      throw new HttpErrors.InternalServerError('Failed to get user count via facade');
    }
  }

  @get('/users/{id}')
  async getUserById(@param.path.number('id') id: number): Promise<object> {
    try {
      const res = await this.axiosClient.get(`${this.baseUrl}/users/${id}`);
      return res.data;
    } catch (err: any) {
      console.error(`Get User by ID Error:`, err.message);
      throw new HttpErrors.NotFound(`User with ID ${id} not found`);
    }
  }

  @patch('/users/{id}')
  async updateUserById(
    @param.path.number('id') id: number,
    @requestBody() user: object,
  ): Promise<void> {
    try {
      await this.axiosClient.patch(`${this.baseUrl}/users/${id}`, user);
    } catch (err: any) {
      console.error('Update User Error:', err.message);
      throw new HttpErrors.InternalServerError('Failed to update user via facade');
    }
  }

  @put('/users/{id}')
  async replaceUserById(
    @param.path.number('id') id: number,
    @requestBody() user: object,
  ): Promise<void> {
    try {
      await this.axiosClient.put(`${this.baseUrl}/users/${id}`, user);
    } catch (err: any) {
      console.error('Replace User Error:', err.message);
      throw new HttpErrors.InternalServerError('Failed to replace user via facade');
    }
  }

  @patch('/users')
  async updateAllUsers(
    @requestBody() user: object,
  ): Promise<object> {
    try {
      const res = await this.axiosClient.patch(`${this.baseUrl}/users`, user);
      return res.data;
    } catch (err: any) {
      console.error('Update All Users Error:', err.message);
      throw new HttpErrors.InternalServerError('Failed to patch users via facade');
    }
  }

  @del('/users/{id}')
  async deleteUserById(@param.path.number('id') id: number): Promise<object> {
    try {
      const res = await this.axiosClient.delete(`${this.baseUrl}/users/${id}`);
      return res.data;
    } catch (err: any) {
      console.error('Delete User Error:', err.message);
      throw new HttpErrors.InternalServerError('Failed to delete user via facade');
    }
  }
}
