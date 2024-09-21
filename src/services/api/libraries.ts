
import appConfig from '@/app.config';
import baseService from './baseService';
import { IPaginationFilter } from './types';
import { ILibrary } from '@/types';

if(!appConfig.apiService) {
  throw new Error('API service URL is not defined');
}

const service = baseService<ILibrary>(appConfig.apiService);

export function getAll(filter: IPaginationFilter) {
  return service.getAll({ ...filter, apiKey: appConfig.apiKey });
}
