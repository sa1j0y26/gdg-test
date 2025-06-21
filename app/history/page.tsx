"use client";
import styles from "./history.module.css";
import { useState, useEffect } from "react";
import { Menu } from "lucide-react";
import BottomNav from "../components/BottomNav";
import VideoCard from "../components/VideoCard";

// 履歴アイテムの型定義
interface HistoryItem {
  text: string;
  videoUrl: string;
  timestamp: string;
}

export default function History() {
  const [history, setHistory] = useState<HistoryItem[]>([]);

  useEffect(() => {
    // localStorageから履歴を取得
    const storedHistory = localStorage.getItem("translationHistory");
    if (storedHistory) {
      setHistory(JSON.parse(storedHistory));
    }
  }, []);

  return (
    <div className={styles.wrapper}>
      {/* 上部バー */}
      <header className={styles.header}>
        <button className={styles.menuBtn} aria-label="menu">
          <Menu size={24} />
        </button>
        <span className={styles.headerTitle}>History</span>
      </header>

      {/* 履歴リスト */}
      <main className={styles.mainContent}>
        {history.length === 0 ? (
          <p className={styles.noHistoryText}>No history yet.</p>
        ) : (
          <div className={styles.historyList}>
            {history.map((item, index) => (
              <VideoCard 
                key={index} 
                text={item.text} 
                videoUrl={item.videoUrl} 
              />
            ))}
          </div>
        )}
      </main>

      <BottomNav />
    </div>
  );
} 