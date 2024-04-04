import { Link } from "react-router-dom";
import styles from "./Homepage.module.css";

function Homepage() {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <span className={styles.title}>InstaWeather</span>
        <span className={styles.caption}>
          &quot;Minimal weather insights, instantly&quot;
        </span>
        <Link to="/InstaWeather/appLayout">
          <button className={styles.button}>GO TO THE APP!</button>
        </Link>
      </div>
    </div>
  );
}

export default Homepage;
