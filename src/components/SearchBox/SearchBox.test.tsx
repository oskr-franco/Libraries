import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import SearchBox from './SearchBox';
import { ISearchBoxProps } from './types';

const renderSearchBox = (props: Partial<ISearchBoxProps> = {}) => {
  const defaultProps: ISearchBoxProps = {
    onSearchChange: jest.fn(),
  };
  return render(<SearchBox {...defaultProps} {...props} />);
};

describe('SearchBox Component', () => {
  test('renders input element correctly', () => {
    renderSearchBox();
    expect(screen.getByPlaceholderText('Search')).toBeInTheDocument();
  });

  test('calls onSearchChange when input value length is greater than 3', () => {
    const onSearchChange = jest.fn();
    renderSearchBox({ onSearchChange });

    const inputElement = screen.getByPlaceholderText('Search');
    fireEvent.change(inputElement, { target: { value: 'React' } });

    expect(onSearchChange).toHaveBeenCalledWith('React');
  });

  test('does not call onSearchChange when input value length is 3 or less', () => {
    const onSearchChange = jest.fn();
    renderSearchBox({ onSearchChange });

    const inputElement = screen.getByPlaceholderText('Search');
    fireEvent.change(inputElement, { target: { value: 'Rea' } });

    expect(onSearchChange).not.toHaveBeenCalled();
  });
});