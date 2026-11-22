import styles from "./styles.module.css";

export default function Home() {
  return (
    <div className={styles.page}>
      <section className={styles.hero}>
        <h1>Team ALL-IN</h1>
        <p className={styles.slogan}>All in, always.</p>
      </section>

      <section className={styles.values}>
        <span className={styles.value}>Intensité</span>
        <span className={styles.value}>Discipline</span>
        <span className={styles.value}>Loyauté</span>
      </section>
    </div>
  );
}
