import { IServiceError, IServiceResponse } from "./types";

async function handleResponse<T>(response: Response): Promise<IServiceResponse<T>> {
  const data = await response.json();
  const headers = response.headers;

  if (!response.ok) {
    if (response.status === 404) {
      return {
        data: [] as T,
        headers
      }
    }
    const errorData = data as IServiceError;
    const { error } = errorData;
    const errorMsg = response.statusText || error;
    console.error('Error:', errorMsg);
    return Promise.reject(errorMsg);
  }
  return {
    data,
    headers,
  };
}

async function fetchAsync<T>(url: string, requestOptions: RequestInit) {
  let response: Response | undefined;
  try {
    response = await fetch(url, requestOptions);
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
  return handleResponse<T>(response);
}

async function get<T>(url: string, headers?: HeadersInit){
  const requestOptions = {
    method: 'GET',
    headers,
  };

  return fetchAsync<T>(url, requestOptions);
}

async function post<T, TOut = T>(
  url: string,
  body: T,
  headers?: HeadersInit,
) {
  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
    body: JSON.stringify(body) as BodyInit,
  };

  const { data } = await fetchAsync<TOut>(url, requestOptions);
  return data
}

async function put<T>(url: string, body: T, headers?: HeadersInit) {
  const requestOptions = {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
    body: JSON.stringify(body),
  };

  const { data } = await fetchAsync<void>(url, requestOptions);
  return data;
}

async function _delete(url: string, headers?: HeadersInit) {
  const requestOptions = {
    method: 'DELETE',
    headers,
  };

  const { data } = await fetchAsync<void>(url, requestOptions);
  return data;
}

const fetchWrapper = {
  get,
  post,
  put,
  delete: _delete,
};

export default fetchWrapper;
