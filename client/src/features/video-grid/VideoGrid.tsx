import React from 'react';
import { useSelector } from 'react-redux';
import styles from './VideoGrid.module.scss';
import { getVideos } from '../../app/groupSlice';

export function VideoGrid() {
  const videos = useSelector(getVideos);
  return (
    <div className={styles.page}>
      <div className={styles.row}>
        {videos.map(v => 
          <div className={styles.video}>{v.title}</div>
        )}
      </div>
    </div>
  );
}
