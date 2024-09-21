import { IPaginationFilterWithKey } from '@/services/api/types';

const keyMapping: Partial<Record<keyof IPaginationFilterWithKey, string>> = {
  search: 'q',
  pageSize: 'per_page',
  pageNumber: 'page',
  apiKey: 'api_key',
  sortBy: 'sort',
};

function toQueryString(params: IPaginationFilterWithKey): string {
  const queryArray = Object.entries(params)
  .filter(([, value]) => value !== undefined)
  .map(([key, value]) => {
    const mappedKey = keyMapping[key as keyof IPaginationFilterWithKey] || key;
    return `${mappedKey}=${encodeURIComponent(value)}`;
  });

  return `?${queryArray.join('&')}`;
}

export default toQueryString;
