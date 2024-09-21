import React, { memo } from 'react';
import { ILibraryListProps } from './types';

import * as styles from './LibraryList.module.scss';
import Library from '../Library';

function LibraryList({ libraries, loading, error }: ILibraryListProps) {
  if (loading) return <div className={styles.loading} >Loading...</div>;

  if (error) return <div className={styles.error} >Error loading libraries</div>;

  if (!libraries || libraries.length === 0) return <div className={styles.container}>No libraries found</div>;

  return (
    <div className={styles.container}>
      <div className={`${styles.item} ${styles.desktop}`}>
        <p>Name</p>
        <p>Stars</p>
        <p>Owner</p>
      </div>
      <ul className={styles.list}>
        {libraries.map((library) => (
          <li key={library.name + library.repository_url} className={styles.item}>
            <Library {...library} />
          </li>
        ))}
      </ul>
    </div>
  )
}

export default memo(LibraryList);
