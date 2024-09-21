import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Header from './Header';

describe('Button Component', () => {
  test('renders button with label', () => {
    render(<Header  />);
    const buttonElement = screen.getByText(/My libraries/i);
    expect(buttonElement).toBeInTheDocument();
  });
});