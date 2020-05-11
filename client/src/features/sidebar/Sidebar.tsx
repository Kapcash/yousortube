import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  selectGroup,
  getSelected,
  getGroups,
} from '../../app/groupSlice';
import styles from './Sidebar.module.scss';

export function Sidebar() {
  const selected = useSelector(getSelected);
  const groups = useSelector(getGroups);
  const dispatch = useDispatch();

  return (
    <div className={styles.sidebar}>
      {groups.map(grp => 
        <button
          className={`${styles.button} ${selected && selected.name === grp.name ? styles.active : ''}`}
          aria-label="Select group"
          onClick={() => dispatch(selectGroup(grp))}
        >{grp.name}</button>
      )}
    </div>
  );
}
