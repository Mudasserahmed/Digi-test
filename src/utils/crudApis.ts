import axios, { AxiosResponse } from 'axios';

// Define types for request data and response data
interface RequestData {
  [key: string]: any;
}

interface ResponseData {
  [key: string]: any;
}

// Function to handle GET request
export async function get<T>(url: string): Promise<T> {
  try {
    const response: AxiosResponse<T> = await axios.get<T>(url);
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
}

// Function to handle POST request
export async function post<T>(url: string, data: RequestData): Promise<T> {
  try {
    const response: AxiosResponse<T> = await axios.post<T>(url, data);
    return response.data;
  } catch (error) {
    console.error('Error posting data:',error);
    throw error;
  }
}

// Function to handle PUT request
export async function put<T>(url: string, data: RequestData): Promise<T> {
  try {
    const response: AxiosResponse<T> = await axios.put<T>(url, data);
    return response.data;
  } catch (error) {
    console.error('Error updating data:', error);
    throw error;
  }
}

// Function to handle DELETE request
export async function remove<T>(url: string ): Promise<T> {
  try {
    const response: AxiosResponse<T> = await axios.delete<T>(url);
    return response.data;
  } catch (error) {
    console.error('Error deleting data:', error);
    throw error;
  }
}
