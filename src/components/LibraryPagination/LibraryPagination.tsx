import React from 'react';


import LibraryList from '@/components/LibraryList';
import Pagination from '@/components/Pagination';
import usePagination from '@/hooks/usePagination';
import { PaginationType } from '@/hooks/usePagination/types';
import Sort from '../Sort';
import SearchBox from '../SearchBox';

const sortOptions = [
  { label: 'Stars', value: 'stars' },
];

const LibraryPagination = () => {
  const { data, pageNumber, totalItems, loading, error, onPageChange, onSort, onSearch } = usePagination(PaginationType.LIBRARY);

  return (
    <div>
      <SearchBox onSearchChange={onSearch} />
      <Sort sortOptions={sortOptions} onSortChange={onSort}/>
      <LibraryList libraries={data} loading={loading} error={error} />
      <Pagination
        currentPage={pageNumber}
        totalPages={Math.ceil(totalItems / 5)}
        onPageChange={onPageChange}
        disabled={loading}
      />
    </div>
  );
};

export default LibraryPagination;
