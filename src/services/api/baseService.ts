import fetchWrapper from './fetchWrapper';
import { IPaginationFilterWithKey, IServiceResponse } from './types';
import toQueryString from '@/utils/toQueryString';

function baseService<T>(url: string) {

  function getQueryString(filter?: IPaginationFilterWithKey) {
    return filter ? toQueryString(filter) : '';
  }
    
  async function getAll(
    filter?: IPaginationFilterWithKey,
    headers?: HeadersInit,
  ) {
    const queryString = getQueryString(filter);
    return fetchWrapper.get<T[]>(
      url + queryString,
      headers,
    );
  }
    
  async function getById(id: number, headers?: HeadersInit) {
    return fetchWrapper.get<T>(`${url}/${id}`, headers);
  }

  async function create<TOut = T>(params: T, headers?: HeadersInit): Promise<IServiceResponse<TOut>> {
    return fetchWrapper.post(url, params, headers);
  }

  async function update(id: number, params: T, headers?: HeadersInit) {
    return fetchWrapper.put(`${url}/${id}`, params, headers);
  }

  async function _delete(id: number, headers?: HeadersInit) {
    return fetchWrapper.delete(`${url}/${id}`, headers);
  }

  return {
    getAll,
    getById,
    create,
    update,
    delete: _delete,
  }
}

export default baseService;


