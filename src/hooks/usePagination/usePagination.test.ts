import { act, renderHook, waitFor } from '@testing-library/react';
// import { renderHook, act } from '@testing-library/react-hooks';
import usePagination from './usePagination';
import { PaginationType } from './types';
// import { getAll } from '@/services/api/libraries';
import { getAll } from '@/services/api/libraries';
import { ILibrary } from '@/types';

jest.mock('lodash.debounce', () => jest.fn(fn => fn));
jest.mock('@/services/api/libraries', () => ({
  getAll: jest.fn(),
}));


// const mockGetAll = getAll as jest.Mock;

const mockGetAll = getAll as jest.MockedFunction<typeof getAll>;

describe('usePagination', () => {
  const mockData: ILibrary[] = [
    {
      name: 'Library 1',
      homepage: 'https://library1.com',
      description: 'Description for Library 1',
      stars: 100,
      repository_url: 'https://github.com/library1'
    },
    {
      name: 'Library 2',
      homepage: 'https://library2.com',
      description: 'Description for Library 2',
      stars: 200,
      repository_url: 'https://github.com/library2'
    }
  ];
  

  beforeEach(() => {
    mockGetAll.mockReset();
  });

  test('should load data on initial render', async () => {
    const mockHeaders = new Headers({ total: '1' });
    mockGetAll.mockResolvedValueOnce({ data: mockData, headers: mockHeaders });

    const { result } = renderHook(() => usePagination(PaginationType.LIBRARY));

    await waitFor(() => {
      expect(result.current.totalItems).toBe(1);
      expect(result.current.data).toEqual(mockData);
      expect(result.current.loading).toBe(false);
      expect(result.current.error).toBe('');
    })
  });

  test('should handle page change', async () => {
    const mockHeaders = new Headers({ total: '1' });
    mockGetAll.mockResolvedValueOnce({ data: mockData, headers: mockHeaders });

    const { result } = renderHook(() => usePagination(PaginationType.LIBRARY));

    waitFor(() => {
      expect(result.current.onPageChange(1));
    });
  
    result.current.onPageChange(2);
    waitFor(() => {
      expect(result.current.onPageChange(2));
    });
  });

  test('should handle sort change', async () => {
    const mockHeaders = new Headers({ total: '1' });
    mockGetAll.mockResolvedValueOnce({ data: mockData, headers: mockHeaders });

    const { result } = renderHook(() => usePagination(PaginationType.LIBRARY));

    waitFor(() => {
      result.current.onSort('name');
    });

    expect(result.current.pageNumber).toBe(1);
    expect(result.current.loading).toBe(true);
  });

  test('should handle search change', async () => {
    const mockHeaders = new Headers({ total: '1' });
    mockGetAll.mockResolvedValueOnce({ data: mockData, headers: mockHeaders });

    const { result } = renderHook(() => usePagination(PaginationType.LIBRARY));

    waitFor(() => {
      result.current.onSearch('React');
    });

    expect(result.current.pageNumber).toBe(1);
    expect(result.current.loading).toBe(true);
  });

  test('should handle errors', async () => {
    mockGetAll.mockRejectedValueOnce(new Error('Error loading libraries'));

    const { result } = renderHook(() => usePagination(PaginationType.LIBRARY));

    waitFor(() => {
      expect(result.current.error).toBe('Error loading libraries');
      expect(result.current.loading).toBe(false);
    });
  });
});