import React from 'react';

import { ISearchBoxProps } from './types';

import * as styles from './SearchBox.module.scss';

function SearchBox({ onSearchChange }: ISearchBoxProps) {
  function searchHandler(event: React.ChangeEvent<HTMLInputElement>) {
    if(event.target.value.length <= 3) return;
    onSearchChange(event.target.value);
  }

  return (
    <input className={styles.searchBox} type="text" placeholder="Search" onChange={searchHandler} />
  );
}

export default SearchBox;
