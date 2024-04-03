import { Link } from "react-router-dom";
import styles from "./Sidebar.module.css";

function Sidebar() {
  return (
    <div className={styles.sidebar}>
      <Link to={"/InstaWeather/"}>
        <img src="logo.png" alt="logo" />
      </Link>
    </div>
  );
}

export default Sidebar;
