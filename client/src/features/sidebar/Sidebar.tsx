import React, { ChangeEvent, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  selectGroup,
  createGroup,
  getSelected,
  getGroups,
} from '../../app/groupSlice';
import styles from './Sidebar.module.scss';

export function Sidebar() {
  const selected = useSelector(getSelected);
  const groups = useSelector(getGroups);
  const dispatch = useDispatch();
  const [grpName, setGrpName] = useState('');

  function createNewGroup() {
    dispatch(createGroup(grpName));
  }

  function changeName(evt: ChangeEvent<HTMLInputElement>) {
    setGrpName(evt.target.value);
  }

  return (
    <div className={styles.sidebar}>
      {groups.map(grp =>
        <button
          key={grp.name}
          className={`${styles.button} ${selected && selected.id === grp.id ? styles.active : ''}`}
          aria-label="Select group"
          onClick={() => dispatch(selectGroup(grp))}
        >{grp.name}</button>
        )}
      <form onSubmit={createNewGroup}>
        <input type="text" name="groupName" value={grpName} onChange={changeName}/>
        <input type="submit" value="+" />
      </form>
    </div>
  );
}
