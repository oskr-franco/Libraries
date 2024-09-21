import baseService from '../baseService';
import fetchWrapper from '../fetchWrapper';
import { IPaginationFilterWithKey } from '../types';

jest.mock('../fetchWrapper');

describe('baseService', () => {
  const url = 'http://example.com/api';
  const service = baseService(url);

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getAll', () => {
    it('should call fetchWrapper.get with correct URL and headers', async () => {
      const filter: IPaginationFilterWithKey = { apiKey: 'value', pageNumber: 1, pageSize: 10 };
      const headers = { 'Authorization': 'Bearer token' };
      const expectedUrl = `${url}?api_key=value&page=1&per_page=10`;

      await service.getAll(filter, headers);

      expect(fetchWrapper.get).toHaveBeenCalledWith(expectedUrl, headers);
    });

    it('should call fetchWrapper.get with URL only when no filter is provided', async () => {
      await service.getAll();

      expect(fetchWrapper.get).toHaveBeenCalledWith(url, undefined);
    });
  });

  describe('getById', () => {
    it('should call fetchWrapper.get with correct URL and headers', async () => {
      const id = 1;
      const headers = { 'Authorization': 'Bearer token' };
      const expectedUrl = `${url}/${id}`;

      await service.getById(id, headers);

      expect(fetchWrapper.get).toHaveBeenCalledWith(expectedUrl, headers);
    });
  });

  describe('create', () => {
    it('should call fetchWrapper.post with correct URL, params, and headers', async () => {
      const params = { name: 'Test' };
      const headers = { 'Authorization': 'Bearer token' };

      await service.create(params, headers);

      expect(fetchWrapper.post).toHaveBeenCalledWith(url, params, headers);
    });
  });

  describe('update', () => {
    it('should call fetchWrapper.put with correct URL, params, and headers', async () => {
      const id = 1;
      const params = { name: 'Updated Test' };
      const headers = { 'Authorization': 'Bearer token' };
      const expectedUrl = `${url}/${id}`;

      await service.update(id, params, headers);

      expect(fetchWrapper.put).toHaveBeenCalledWith(expectedUrl, params, headers);
    });
  });

  describe('delete', () => {
    it('should call fetchWrapper.delete with correct URL and headers', async () => {
      const id = 1;
      const headers = { 'Authorization': 'Bearer token' };
      const expectedUrl = `${url}/${id}`;

      await service.delete(id, headers);

      expect(fetchWrapper.delete).toHaveBeenCalledWith(expectedUrl, headers);
    });
  });
});