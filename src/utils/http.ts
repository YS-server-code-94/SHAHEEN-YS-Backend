import axios, { AxiosRequestConfig } from 'axios';
import { logError } from './logger';

export interface HttpRequestOptions extends AxiosRequestConfig {
  timeout?: number;
}

export class HttpClient {
  private static readonly DEFAULT_TIMEOUT = 30000;

  static async get<T>(url: string, options?: HttpRequestOptions): Promise<T> {
    return this.request<T>('GET', url, undefined, options);
  }

  static async post<T>(url: string, data?: any, options?: HttpRequestOptions): Promise<T> {
    return this.request<T>('POST', url, data, options);
  }

  static async put<T>(url: string, data?: any, options?: HttpRequestOptions): Promise<T> {
    return this.request<T>('PUT', url, data, options);
  }

  static async patch<T>(url: string, data?: any, options?: HttpRequestOptions): Promise<T> {
    return this.request<T>('PATCH', url, data, options);
  }

  static async delete<T>(url: string, options?: HttpRequestOptions): Promise<T> {
    return this.request<T>('DELETE', url, undefined, options);
  }

  private static async request<T>(
    method: string,
    url: string,
    data?: any,
    options?: HttpRequestOptions
  ): Promise<T> {
    try {
      const config: AxiosRequestConfig = {
        method,
        url,
        data,
        timeout: options?.timeout || this.DEFAULT_TIMEOUT,
        ...options,
      };

      const response = await axios(config);
      return response.data as T;
    } catch (error) {
      logError(error, { method, url });
      throw error;
    }
  }
}
