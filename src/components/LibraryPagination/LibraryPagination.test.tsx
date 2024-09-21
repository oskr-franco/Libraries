import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import LibraryPagination from './LibraryPagination';
import usePagination from '@/hooks/usePagination';
import { ILoadResponseType, PaginationType } from '@/hooks/usePagination/types';
import { ILibrary } from '@/types';

// Mock the appConfig
jest.mock('@/app.config', () => ({
  __esModule: true,
  default: {
    apiService: 'http://example.com/api',
  },
}));

// Mock the usePagination hook
jest.mock('@/hooks/usePagination', () => ({
  __esModule: true,
  default: jest.fn(),
}));

const mockUsePagination = usePagination as jest.MockedFunction<
  (paginationType: PaginationType) => ILoadResponseType<ILibrary>
>;

describe('LibraryPagination Component', () => {
  beforeEach(() => {
    mockUsePagination.mockReturnValue({
      data: [],
      pageNumber: 1,
      totalItems: 0,
      loading: false,
      onPageChange: jest.fn(),
      onSort: jest.fn(),
      onSearch: jest.fn(),
    });
  });

  test('renders loading state', () => {
    mockUsePagination.mockReturnValue({
      data: [],
      pageNumber: 1,
      totalItems: 0,
      loading: true,
      onPageChange: jest.fn(),
      onSort: jest.fn(),
      onSearch: jest.fn(),
    });

    render(<LibraryPagination />);
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  test('renders error state', () => {
    mockUsePagination.mockReturnValue({
      data: [],
      pageNumber: 1,
      totalItems: 0,
      loading: false,
      error: 'Error loading libraries',
      onPageChange: jest.fn(),
      onSort: jest.fn(),
      onSearch: jest.fn(),
    });

    render(<LibraryPagination />);
    expect(screen.getByText('Error loading libraries')).toBeInTheDocument();
  });

  test('renders no libraries found state', () => {
    render(<LibraryPagination />);
    expect(screen.getByText('No libraries found')).toBeInTheDocument();
  });

  test('renders list of libraries', () => {
    mockUsePagination.mockReturnValue({
      data: [
        {
          name: 'React',
          description: 'A JavaScript library for building user interfaces',
          stars: 150000,
          repository_url: 'https://github.com/facebook/react',
          homepage: ''
        },
        {
          name: 'Vue',
          description: 'The Progressive JavaScript Framework',
          stars: 180000,
          repository_url: 'https://github.com/vuejs/vue',
          homepage: ''
        },
      ],
      pageNumber: 1,
      totalItems: 2,
      loading: false,
      onPageChange: jest.fn(),
      onSort: jest.fn(),
      onSearch: jest.fn(),
    });

    render(<LibraryPagination />);
    expect(screen.getByText('React')).toBeInTheDocument();
    expect(screen.getByText('Vue')).toBeInTheDocument();
  });

  test('handles pagination change', () => {
    const onPageChangeMock = jest.fn();
    mockUsePagination.mockReturnValue({
      data: [],
      pageNumber: 1,
      totalItems: 10,
      loading: false,
      onPageChange: onPageChangeMock,
      onSort: jest.fn(),
      onSearch: jest.fn(),
    });

    render(<LibraryPagination />);
    fireEvent.click(screen.getByText('Next'));
    expect(onPageChangeMock).toHaveBeenCalled();
  });

  test('handles sort change', () => {
    const onSortMock = jest.fn();
    mockUsePagination.mockReturnValue({
      data: [],
      pageNumber: 1,
      totalItems: 0,
      loading: false,
      onPageChange: jest.fn(),
      onSort: onSortMock,
      onSearch: jest.fn(),
    });

    render(<LibraryPagination />);
    fireEvent.change(screen.getByRole('combobox'), { target: { value: 'stars' } });
    expect(onSortMock).toHaveBeenCalledWith('stars');
  });

  test('handles search change', () => {
    const onSearchMock = jest.fn();
    mockUsePagination.mockReturnValue({
      data: [],
      pageNumber: 1,
      totalItems: 0,
      loading: false,
      onPageChange: jest.fn(),
      onSort: jest.fn(),
      onSearch: onSearchMock,
    });

    render(<LibraryPagination />);
    fireEvent.change(screen.getByPlaceholderText('Search'), { target: { value: 'React' } });
    expect(onSearchMock).toHaveBeenCalledWith('React');
  });
});