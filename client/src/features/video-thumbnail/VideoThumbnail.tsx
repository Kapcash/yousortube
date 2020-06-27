import React from 'react';
import styles from './VideoThumbnail.module.scss';
import { Video } from '../../app/groupSlice';

interface VideoProps {
  video: Video;
}

export const VideoThumbnail: React.SFC<VideoProps> = ({ video }) => {
  return (
    <a id={`thumbnail-${video.id}`} className={styles.card} href={video.link}>
      <img className={styles.thumbnail} src={video.thumbnailUrl} alt={video.title}></img>
      <div className={styles.metadata}>
        <h3>{video.title}</h3>
        <span className={styles.author}>{video.author}</span>
      </div>
    </a>
  );
}
