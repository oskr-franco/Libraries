export interface IPaginationProps {
  currentPage: number;
  disabled?: boolean;
  totalPages: number;
  onPageChange: (page: number) => void;
}
