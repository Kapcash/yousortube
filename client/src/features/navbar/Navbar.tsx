import React from 'react';
import styles from './Navbar.module.scss';

export function Navbar() {
  return (
    <nav className={styles.navbar}>
      <img src="/logo192.png" alt="yousortube logo" width="40px"/>
      <h1>YOUSORTUBE</h1>
    </nav>
  );
}
