import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Sidebar from './Sidebar';
import * as styles from './Sidebar.module.scss';

describe('Sidebar Component', () => {
  test('renders sidebar element', () => {
    render(<Sidebar />);
    const sidebarElement = screen.getByRole('complementary');
    expect(sidebarElement).toBeInTheDocument();
  });

  test('renders navigation items', () => {
    render(<Sidebar />);
    const navItems = ['Home', 'Search', 'About'];
    navItems.forEach(item => {
      expect(screen.getByText(item)).toBeInTheDocument();
    });
  });
});