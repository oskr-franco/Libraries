import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Pagination from './Pagination';
import { IPaginationProps } from './types';

const renderPagination = (props: Partial<IPaginationProps> = {}) => {
  const defaultProps: IPaginationProps = {
    currentPage: 1,
    totalPages: 5,
    onPageChange: jest.fn(),
  };
  return render(<Pagination {...defaultProps} {...props} />);
};

describe('Pagination Component', () => {
  test('renders pagination buttons correctly', () => {
    renderPagination({ currentPage: 3, totalPages: 5 });

    expect(screen.getByText('Prev')).toBeInTheDocument();
    expect(screen.getByText('First')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
    expect(screen.getByText('3')).toBeInTheDocument();
    expect(screen.getByText('4')).toBeInTheDocument();
    expect(screen.getByText('Last')).toBeInTheDocument();
    expect(screen.getByText('Next')).toBeInTheDocument();
  });

  test('disables "Prev" and "First" buttons on the first page', () => {
    renderPagination({ currentPage: 1, totalPages: 5 });

    expect(screen.getByText('Prev')).toBeDisabled();
    expect(screen.getByText('First')).toBeDisabled();
  });

  test('disables "Next" and "Last" buttons on the last page', () => {
    renderPagination({ currentPage: 5, totalPages: 5 });

    expect(screen.getByText('Next')).toBeDisabled();
    expect(screen.getByText('Last')).toBeDisabled();
  });

  test('calls onPageChange with the correct page number', () => {
    const onPageChange = jest.fn();
    renderPagination({ currentPage: 3, totalPages: 5, onPageChange });

    fireEvent.click(screen.getByText('Prev'));
    expect(onPageChange).toHaveBeenCalledWith(2);

    fireEvent.click(screen.getByText('Next'));
    expect(onPageChange).toHaveBeenCalledWith(4);

    fireEvent.click(screen.getByText('First'));
    expect(onPageChange).toHaveBeenCalledWith(1);

    fireEvent.click(screen.getByText('Last'));
    expect(onPageChange).toHaveBeenCalledWith(5);

    fireEvent.click(screen.getByText('2'));
    expect(onPageChange).toHaveBeenCalledWith(2);
  });

  test('disables all buttons when disabled is true', () => {
    renderPagination({ currentPage: 3, totalPages: 6, disabled: true });
    expect(screen.getByText('Prev')).toBeDisabled();
    expect(screen.getByText('First')).toBeDisabled();
    expect(screen.getByText('2')).toBeDisabled();
    expect(screen.getByText('3')).toBeDisabled();
    expect(screen.getByText('4')).toBeDisabled();
    expect(screen.getByText('5')).toBeDisabled();
    expect(screen.getByText('Last')).toBeDisabled();
    expect(screen.getByText('Next')).toBeDisabled();
  });
});