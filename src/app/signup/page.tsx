"use client";
import styles from "./signup.module.css";

export default function Signup() {
  return (
    <div className={styles.signupContainer}>
      <h1 className={styles.title}>Sign up</h1>
      <p className={styles.subtitle}>Create an account to get started</p>
      <form className={styles.form}>
        <label className={styles.label}>
          Name
          <input className={styles.input} type="text" placeholder="" defaultValue="Daniel" />
        </label>
        <label className={styles.label}>
          Email Address
          <input className={styles.input} type="email" placeholder="name@email.com" />
        </label>
        <label className={styles.label}>
          Password
          <div className={styles.inputIconWrap}>
            <input className={styles.input} type="password" placeholder="Create a password" />
            <span className={styles.icon} aria-label="show/hide password">👁️</span>
          </div>
        </label>
        <label className={styles.label}>
          <div className={styles.inputIconWrap}>
            <input className={styles.input} type="password" placeholder="Confirm password" />
            <span className={styles.icon} aria-label="show/hide password">👁️</span>
          </div>
        </label>
        <label className={styles.checkboxLabel}>
          <input type="checkbox" className={styles.checkbox} />
          <span>
            I've read and agree with the <a href="#" className={styles.link}>Terms and Conditions</a> and the <a href="#" className={styles.link}>Privacy Policy</a>.
          </span>
        </label>
      </form>
    </div>
  );
} 