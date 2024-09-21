import React, { useMemo } from 'react';

import { ILibrary } from '@/types';
import getOwner from '@/utils/getOwner';

import * as styles from './Library.module.scss';

function Library({name, homepage, description, stars, repository_url}: ILibrary) {
  const owner = useMemo(() => getOwner(repository_url), [repository_url]);
  
  return (
    <>
      <div>
        <h2>{name}</h2>
        <p>{homepage}</p>
        <p>{description}</p>
      </div>
      <div><span className={styles.mobile}>Stars:</span> {stars}</div>
      <div><span className={styles.mobile}>Owner:</span> {owner}</div>
    </>
  );
}
export default Library;
