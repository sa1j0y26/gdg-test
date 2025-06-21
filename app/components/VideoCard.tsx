"use client";
import { useState } from 'react';
import { Star, Copy, Share2 } from 'lucide-react';
import styles from './VideoCard.module.css';

interface VideoCardProps {
  text: string;
  videoUrl: string;
  isFavorite?: boolean;
  onToggleFavorite?: () => void;
  hideHeader?: boolean;
}

export default function VideoCard({ text, videoUrl, isFavorite, onToggleFavorite, hideHeader = false }: VideoCardProps) {
  const [isPlaying, setIsPlaying] = useState(false);

  const handleCardClick = () => {
    if (!isPlaying && videoUrl) {
      setIsPlaying(true);
    }
  };

  return (
    <div className={styles.card}>
      {!hideHeader && (
        <div className={styles.cardHeader}>
          <div className={styles.cardHeaderText}>
            <span className={styles.langTag}>en</span>
            <span>{text}</span>
          </div>
        </div>
      )}
      <div className={styles.videoContainer} onClick={handleCardClick}>
        {isPlaying ? (
          <video
            src={videoUrl}
            controls
            autoPlay
            onEnded={() => setIsPlaying(false)}
            className={styles.videoPlayer}
          />
        ) : (
          <div className={styles.videoPlaceholder}>
            <p>Video of Sign Language Translation</p>
          </div>
        )}
      </div>
       <div className={styles.cardFooter}>
        <button className={styles.footerBtn} onClick={() => navigator.clipboard.writeText(videoUrl)} disabled={!videoUrl}>
          <Copy size={18} />
        </button>
        <button className={styles.footerBtn} onClick={() => window.open(videoUrl, '_blank')} disabled={!videoUrl}>
          <Share2 size={18} />
        </button>
        <button 
          className={`${styles.footerBtn} ${isFavorite ? styles.favorite : ''}`} 
          aria-label="favorite"
          onClick={onToggleFavorite}
          disabled={!onToggleFavorite}
        >
          <Star size={18} />
        </button>
      </div>
    </div>
  );
} 