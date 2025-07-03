"use client";
import styles from "./translate.module.css";
import { useState } from "react";
import {
  Menu,
  Languages,
  X,
  Mic,
} from "lucide-react";
import BottomNav from "../components/BottomNav";
import dynamic from 'next/dynamic';

const VideoCard = dynamic(() => import('../components/VideoCard'), {
  loading: () => <div className={styles.loading}><p>Loading result...</p></div>,
});

export default function Translate() {
  const [input, setInput] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleTranslate = async () => {
    setLoading(true);
    setError("");
    setVideoUrl("");
    try {
      // const res = await fetch(`/api/sign/${encodeURIComponent(input)}`);
      // translate between english and japanese
      const res = await fetch("/api/translate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text: input }),
      });
  
      const data = await res.json();
      if (!res.ok) throw new Error("API error");
      
      if (data.movie_link) {
        setVideoUrl(data.movie_link);

        const newHistoryItem = {
          text: input,
          videoUrl: data.movie_link,
          timestamp: new Date().toISOString(),
        };

        const storedHistory = localStorage.getItem("translationHistory");
        const history = storedHistory ? JSON.parse(storedHistory) : [];

        const updatedHistory = [newHistoryItem, ...history].slice(0, 50);

        localStorage.setItem("translationHistory", JSON.stringify(updatedHistory));

      } else {
        setError("動画が見つかりませんでした");
      }
    } catch (e) {
      setError("通信エラー");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.wrapper}>
      {/* 上部バー */}
      <header className={styles.header}>
        <button className={styles.menuBtn} aria-label="menu">
          <Menu size={24} />
        </button>
        <span className={styles.headerTitle}>Sign language translation</span>
      </header>

      <main className={styles.mainContent}>
        {/* 言語切替バー */}
        <div className={styles.langBar}>
          <span className={styles.langItem}>
            <span className={styles.flag} role="img" aria-label="us">🇺🇸</span> English
          </span>
          <Languages size={20} className={styles.swapIcon} />
          <span className={styles.langItem}>Sign Language</span>
        </div>

        {/* 入力カード */}
        <div className={styles.inputCard}>
          <div className={styles.inputCardHeader}>
            <span className={styles.inputCardLabel}>English</span>
            <button className={styles.clearBtn} aria-label="clear" onClick={() => setInput("")}>
              <X size={18} />
            </button>
          </div>
          <textarea
            className={styles.textarea}
            placeholder="Enter text here..."
            rows={3}
            value={input}
            onChange={e => setInput(e.target.value)}
          />
          <div className={styles.inputCardFooter}>
            <button className={styles.micBtn} aria-label="mic">
              <Mic size={20} />
            </button>
            <button className={styles.translateBtn} onClick={handleTranslate} disabled={loading || !input}>
              {loading ? "Translating..." : "Translate"}
            </button>
          </div>
        </div>

        {/* 結果カード（動画表示） */}
        <div className={styles.outputContainer}>
          {error && <div className={styles.errorMsg}>{error}</div>}
          
          {loading && (
            <div className={styles.loading}>
              <p>Translating...</p>
            </div>
          )}

          {!error && !loading && (
             <VideoCard 
               text={input} 
               videoUrl={videoUrl} 
               hideHeader={!videoUrl} 
             />
          )}
        </div>
      </main>

      <BottomNav />
    </div>
  );
} 

