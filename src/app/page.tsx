"use client";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.container}>
      <div className={styles.bgCircles}></div>
      <div className={styles.centerBox}>
        <div className={styles.logo}>LOGO</div>
        <div className={styles.title}>SIGN LANGUAGE TRANSLATION</div>
        <button className={styles.primaryBtn}>Sign in</button>
        <button className={styles.secondaryBtn}>Log in</button>
      </div>
    </div>
  );
}
