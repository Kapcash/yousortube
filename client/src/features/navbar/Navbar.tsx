import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  selectGroup,
  getSelected,
  getGroups,
} from '../../app/groupSlice';
import styles from './Navbar.module.scss';

export function Navbar() {
  const selected = useSelector(getSelected);
  const groups = useSelector(getGroups);
  const dispatch = useDispatch();

  return (
    <div className={styles.navbar}>
      <img src="/logo192.png" alt="yousortube logo"/>
      <h3>YOUSORTUBE</h3>
    </div>
  );
}
