import { getAll as getAllLibraries } from '@/services/api/libraries';
import { ILibrary } from '@/types';

export enum PaginationType {
  LIBRARY,
}

export interface IPaginationTypeMapper {
  [PaginationType.LIBRARY]: ILibrary
}

export const PaginationFunctions = {
  [PaginationType.LIBRARY]: getAllLibraries,
};

export interface ILoadResponseType<T> {
  data: T[];
  pageNumber: number;
  totalItems: number;
  loading: boolean;
  error?: string;
  onPageChange: (pageNumber: number) => void;
  onSort: (sortBy?: string) => void;
  onSearch: (search: string) => void;
}