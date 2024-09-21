import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom'; // Import jest-dom for additional matchers
import LibraryList from './LibraryList'; // Adjust the import path as necessary
import { ILibrary } from '@/types';

// Mock the Library component
jest.mock('../Library', () => {
  const MockedLibrary = () => <div>Mocked Library</div>;
  MockedLibrary.displayName = 'MockedLibrary';
  return MockedLibrary;
});

describe('LibraryList Component', () => {
  const mockLibraries: ILibrary[] = [
    {
      name: 'Test Library 1',
      homepage: 'https://example.com',
      description: 'This is a test library 1.',
      stars: 123,
      repository_url: 'https://github.com/test/test-library-1',
    },
    {
      name: 'Test Library 2',
      homepage: 'https://example.com',
      description: 'This is a test library 2.',
      stars: 456,
      repository_url: 'https://github.com/test/test-library-2',
    },
  ];

  test('renders loading state', () => {
    render(<LibraryList libraries={[]} loading={true} />);
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  test('renders error state', () => {
    render(<LibraryList libraries={[]} loading={false} error="Error loading libraries" />);
    expect(screen.getByText('Error loading libraries')).toBeInTheDocument();
  });

  test('renders no libraries found state', () => {
    render(<LibraryList libraries={[]} loading={false} />);
    expect(screen.getByText('No libraries found')).toBeInTheDocument();
  });

  test('renders list of libraries', () => {
    render(<LibraryList libraries={mockLibraries} loading={false} />);
    expect(screen.getByText('Name')).toBeInTheDocument();
    expect(screen.getByText('Stars')).toBeInTheDocument();
    expect(screen.getByText('Owner')).toBeInTheDocument();
    expect(screen.getAllByText('Mocked Library')).toHaveLength(2);
  });
});
