import React from 'react';

import * as styles from './Sidebar.module.scss';

const Sidebar = () => {
  return (
    <aside className={styles.sidebar}>
      <nav>
        <ul className={styles.list}>
          <li className={styles.row}>Home</li>
          <li className={styles.row}>Search</li>
          <li className={styles.row}>About</li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;