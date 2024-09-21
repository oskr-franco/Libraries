import React, { memo } from 'react';
import { IPaginationProps } from './types';

import * as styles from './Pagination.module.scss';

function Pagination({ currentPage, totalPages, onPageChange, disabled }: IPaginationProps) {

  // Helper to generate a button
  const renderPageButton = (page: number, label?: string, disabled: boolean = false) => (
    <button key={label || page} onClick={() => onPageChange(page)} disabled={disabled}>
      {label || page}
    </button>
  );

  // Generate the buttons
  const renderPaginationButtons = () => {
    const buttons = [];

    // "Prev" button
    buttons.push(renderPageButton(currentPage - 1, 'Prev', disabled || currentPage === 1));

    // "First" button
    buttons.push(renderPageButton(1, 'First', disabled || currentPage === 1));

    // -2 current page
    if (currentPage - 2 > 1) {
      const value = currentPage - 2;
      buttons.push(renderPageButton(value, `${value}`, disabled));
    }

    // -1 current page
    if (currentPage - 1 > 1) {
      const value = currentPage - 1;
      buttons.push(renderPageButton(value, `${value}`, disabled));
    }

    // Current page
    buttons.push(renderPageButton(currentPage, `${currentPage}`, true));

    // +1 current page
    if (currentPage + 1 < totalPages) {
      const value = currentPage + 1;
      buttons.push(renderPageButton(value, `${value}`, disabled));
    }

    // +2 current page
    if (currentPage + 2 < totalPages) {
      const value = currentPage + 2;
      buttons.push(renderPageButton(value, `${value}`, disabled));
    }

    // "Last" button
    buttons.push(renderPageButton(totalPages, 'Last',  disabled || currentPage === totalPages));


    // "Next" button
    buttons.push(renderPageButton(currentPage + 1, 'Next',  disabled || currentPage === totalPages));


    return buttons;
  };

  return <div className={styles.container}>{renderPaginationButtons()}</div>;
};

export default memo(Pagination);
