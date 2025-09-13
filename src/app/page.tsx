import styles from './styles/Home.module.css';
import Link from 'next/link';

export default function Home() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.leftPane}>
        <h1 className={styles.heading}>Welcome</h1>
        <p className={styles.subtext}>Please login to continue your journey.</p>
        <Link href="/login" className={styles.loginBtn}>
          Login
        </Link>
         <Link href="/dashboard" className={styles.loginBtn}>
          Dashbord
        </Link>
      </div>
      <div className={styles.rightPane}></div>
    </div>
  );
}