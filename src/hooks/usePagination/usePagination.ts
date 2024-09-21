import { useEffect, useState } from 'react';

import { ILoadResponseType, PaginationFunctions, PaginationType, IPaginationTypeMapper } from './types';
import debounce from 'lodash.debounce';

const PAGE_SIZE = 5;
const DEBOUNCE_SEARCH_TIME = 1000;

function usePagination<T extends PaginationType>(paginationType: T): ILoadResponseType<IPaginationTypeMapper[T]> {
  const [data, setData] = useState<IPaginationTypeMapper[T][]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>();
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [sortBy, setSortBy] = useState<string | undefined>();
  const [search, setSearch] = useState<string | undefined>();
  const getAll = PaginationFunctions[paginationType] || null;

  useEffect(() => {
    handleLoadData(currentPage);
  },[sortBy, currentPage, search]);

  function handleSortChange(sortBy?: string) {
    setSortBy(sortBy);
    setCurrentPage(1)
  }

  function handlePageChange(pageNumber: number) {
    setCurrentPage(pageNumber);
  }
  
  const debounceSearch = debounce(function handleSearchChange(search: string) {
    setSearch(search);
    setCurrentPage(1);
  }, DEBOUNCE_SEARCH_TIME);

  async function handleLoadData(pageNumber: number) {
    try {
      setLoading(true);
      setError("");
      //when pageNumber is 301 returns 404 Not Found
      const { data, headers } = await getAll({ pageNumber: pageNumber, pageSize: PAGE_SIZE, sortBy: sortBy, search: search });
      setData(data);
      const totalItems = Number(headers.get('total'));
      if(totalItems){
        setTotalItems(Number(headers.get('total')));
      }
    } catch {
      setError("Error loading libraries");
    } finally {
      setLoading(false);
    }
  }

  return {
    data,
    pageNumber: currentPage,
    loading,
    error,
    totalItems,
    onPageChange:handlePageChange,
    onSort: handleSortChange,
    onSearch: debounceSearch
  };
}

export default usePagination;
