export interface IPaginationFilter {
  pageSize?: number;
  pageNumber?: number;
  search?: string;
  sortBy?: string;
};

export interface IPaginationFilterWithKey extends IPaginationFilter {
  apiKey?: string;
};

export interface IServiceError {
  error: string;
};

export interface IServiceResponse<T> {
  data: T;
  headers: Headers;
}