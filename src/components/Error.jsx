import { useWeather } from "../contexts/WeatherContext";
import styles from "./Error.module.css";

function Error() {
  const { error, dispatch } = useWeather();
  return (
    <>
      <div className={styles.overlay}></div>
      <div className={styles.popup}>
        <button
          className={styles.closeButton}
          onClick={() => {
            dispatch({ type: "error/new", payload: "" });
          }}
        >
          ✖
        </button>
        <p>⚠️ {error}</p>
      </div>
    </>
  );
}

export default Error;
