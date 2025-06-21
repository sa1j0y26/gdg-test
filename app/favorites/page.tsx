"use client";
import styles from "./favorites.module.css";
import { useState, useEffect } from "react";
import { Menu } from "lucide-react";
import BottomNav from "../components/BottomNav";
import VideoCard from "../components/VideoCard";

// お気に入りアイテムの型定義（履歴と同じ構造を仮定）
interface FavoriteItem {
  text: string;
  videoUrl: string;
  timestamp: string;
}

export default function Favorites() {
  const [favorites, setFavorites] = useState<FavoriteItem[]>([]);

  // ここに、将来的にlocalStorageなどからお気に入りデータを取得するロジックが入ります。
  useEffect(() => {
    // const storedFavorites = localStorage.getItem("translationFavorites");
    // if (storedFavorites) {
    //   setFavorites(JSON.parse(storedFavorites));
    // }
  }, []);

  return (
    <div className={styles.wrapper}>
      {/* 上部バー */}
      <header className={styles.header}>
        <button className={styles.menuBtn} aria-label="menu">
          <Menu size={24} />
        </button>
        <span className={styles.headerTitle}>Favorites</span>
      </header>

      {/* お気に入りリスト */}
      <main className={styles.mainContent}>
        {favorites.length === 0 ? (
          <p className={styles.noItemsText}>You have no favorite translations yet.</p>
        ) : (
          <div className={styles.favoritesList}>
            {favorites.map((item, index) => (
              <VideoCard
                key={index}
                text={item.text}
                videoUrl={item.videoUrl}
                isFavorite={true}
              />
            ))}
          </div>
        )}
      </main>

      {/* 下部ナビゲーションバー */}
      <BottomNav />
    </div>
  );
} 