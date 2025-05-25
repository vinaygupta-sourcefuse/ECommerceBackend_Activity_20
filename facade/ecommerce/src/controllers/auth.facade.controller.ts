import {post, requestBody, HttpErrors} from '@loopback/rest';
import {inject} from '@loopback/core';
import axios, {AxiosInstance} from 'axios';

export class AuthFacadeController {
  protected axiosClient: AxiosInstance;

  constructor() {
    // You can configure the baseURL and other options here
    this.axiosClient = axios.create({
      baseURL: 'http://localhost:3011',
      headers: {'Content-Type': 'application/json'},
    });
  }
  
  @post('/signup')
  async signup(@requestBody() userData: object): Promise<object> {
    try {
      const response = await this.axiosClient.post('/signup', userData);
      return response.data;
    } catch (err: any) {
      console.error('Signup proxy error:', err.message);
      throw new HttpErrors.InternalServerError('Signup via facade failed');
    }
  }

  @post('/login')
  async login(
    @requestBody() credentials: {name: string; password: string},
  ): Promise<object> {
    try {
      const response = await this.axiosClient.post('/login', credentials);
      return response.data;
    } catch (err: any) {
      console.error('Login proxy error:', err.message);
      throw new HttpErrors.Unauthorized('Login via facade failed');
    }
  }

  @post('/logout')
  async logout(@requestBody() body: {refreshToken: string}): Promise<object> {
    try {
      const response = await this.axiosClient.post('/logout', body);
      return response.data;
    } catch (err: any) {
      console.error('Logout proxy error:', err.message);
      throw new HttpErrors.InternalServerError('Logout via facade failed');
    }
  }

  @post('/refresh-token')
  async refreshToken(@requestBody() body: {refreshToken: string}): Promise<object> {
    try {
      const response = await this.axiosClient.post('/refresh-token', body);
      return response.data;
    } catch (err: any) {
      console.error('Refresh token proxy error:', err.message);
      throw new HttpErrors.Unauthorized('Token refresh via facade failed');
    }
  }
}
