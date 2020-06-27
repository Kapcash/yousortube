import React from 'react';
import { useSelector } from 'react-redux';
import styles from './VideoGrid.module.scss';
import { getVideos } from '../../app/groupSlice';
import { VideoThumbnail } from '../video-thumbnail/VideoThumbnail';

export function VideoGrid() {
  const videos = useSelector(getVideos);
  return (
    <div className={styles.flexGrid}>
      {videos.map(v => 
        <VideoThumbnail video={v} key={v.id}/>
      )}
    </div>
  );
}
