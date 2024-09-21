import React, { useState } from 'react';
import { ISortProps } from './types';

import * as styles from './Sort.module.scss';

function Sort({ sortOptions, currentSortField, onSortChange }: ISortProps) {
  const [selectedField, setSelectedField] = useState<string | undefined>(currentSortField);

  const handleSortFieldChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newSortField = event.target.value;
    setSelectedField(newSortField);
    onSortChange(newSortField);
  };

  return (
    <div className={styles.sortContainer}>
      <label htmlFor="sort-field">Sort by: </label>
      <select
        id="sort-field"
        value={selectedField || ''}
        onChange={handleSortFieldChange}
      >
        <option value="">None</option>
        {sortOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Sort;