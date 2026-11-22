import styles from "./styles.module.css";
import Navbar from "@/components/specific/navbar/Navbar";

export default function Home() {
  return (
    <div className={styles.page}>
      <Navbar />
      <section id="accueil" className={styles.hero}>
        <h1>Team ALL-IN</h1>
        <p className={styles.slogan}>All in, always.</p>
      </section>

      <section id="valeurs" className={styles.values}>
        <span className={styles.value}>Intensité</span>
        <span className={styles.value}>Discipline</span>
        <span className={styles.value}>Loyauté</span>
      </section>
    </div>
  );
}
