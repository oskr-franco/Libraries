export interface ISortOption {
  label: string;
  value: string;
}

export interface ISortProps {
  sortOptions: ISortOption[];
  currentSortField?: string;
  onSortChange: (sortField?: string) => void;
}