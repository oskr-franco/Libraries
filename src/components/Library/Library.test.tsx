import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom'; // Import jest-dom for additional matchers
import Library from './Library'; // Adjust the import path as necessary
import { ILibrary } from '@/types';
import getOwner from '@/utils/getOwner';

// Mock the getOwner function
jest.mock('@/utils/getOwner', () => jest.fn());

describe('Library Component', () => {
  const mockLibrary: ILibrary = {
    name: 'Test Library',
    homepage: 'https://example.com',
    description: 'This is a test library.',
    stars: 123,
    repository_url: 'https://github.com/test/test-library',
  };

  beforeEach(() => {
    (getOwner as jest.Mock).mockReturnValue('test-owner');
  });

  test('renders library details correctly', () => {
    render(<Library {...mockLibrary} />);

    expect(screen.getByText('Test Library')).toBeInTheDocument();
    expect(screen.getByText('https://example.com')).toBeInTheDocument();
    expect(screen.getByText('This is a test library.')).toBeInTheDocument();
    expect(screen.getByText('Stars:')).toBeInTheDocument();
    expect(screen.getByText('123')).toBeInTheDocument();
    expect(screen.getByText('Owner:')).toBeInTheDocument();
    expect(screen.getByText('test-owner')).toBeInTheDocument();
  });
});