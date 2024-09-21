import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Footer from './Footer';

describe('Button Component', () => {
  test('renders button with label', () => {
    render(<Footer  />);
    const buttonElement = screen.getByText(/© 2024 Library pagination/i);
    expect(buttonElement).toBeInTheDocument();
  });
});