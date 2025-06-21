"use client";
import styles from "./translate.module.css";

export default function Translate() {
  return (
    <div className={styles.wrapper}>
      {/* 上部バー */}
      <header className={styles.header}>
        <button className={styles.menuBtn} aria-label="menu">☰</button>
        <span className={styles.headerTitle}>Sign language translation</span>
      </header>

      {/* 言語切替バー */}
      <div className={styles.langBar}>
        <span className={styles.langItem}>
          <span className={styles.flag} role="img" aria-label="us">🇺🇸</span> English
        </span>
        <span className={styles.swapIcon}>↔</span>
        <span className={styles.langItem}>Sign Language</span>
      </div>

      {/* 入力カード */}
      <div className={styles.inputCard}>
        <div className={styles.inputCardHeader}>
          <span className={styles.inputCardLabel}>English</span>
          <button className={styles.clearBtn} aria-label="clear">✕</button>
        </div>
        <textarea className={styles.textarea} placeholder="Enter text here..." rows={3} />
        <div className={styles.inputCardFooter}>
          <button className={styles.micBtn} aria-label="mic">🎤</button>
          <button className={styles.translateBtn}>Translate</button>
        </div>
      </div>

      {/* 下部ナビゲーションバー */}
      <nav className={styles.bottomNav}>
        <button className={styles.navBtn} aria-label="book">📖</button>
        <button className={styles.navBtn} aria-label="translate">
          <span className={styles.navIconActive}>🌐</span>
        </button>
        <button className={styles.navBtn} aria-label="camera">
          <span className={styles.navIconCamera}>📷</span>
        </button>
        <button className={styles.navBtn} aria-label="history">⏪</button>
        <button className={styles.navBtn} aria-label="star">⭐</button>
      </nav>
    </div>
  );
} 