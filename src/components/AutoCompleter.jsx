import styles from "./AutoCompleter.module.css";
import { useWeather } from "../contexts/WeatherContext";
import filterUnique from "../helpers/filterUnique";

function AutoCompleter() {
  const { results, dispatch } = useWeather();

  return (
    <div className={styles.autocompleteContainer}>
      {results.length
        ? filterUnique(results, "city", "country_code").map((result) => (
            <div
              className={`${styles.autocompleteOption} ${styles.hidden}`}
              key={result.place_id}
              onClick={() =>
                dispatch({ type: "city/changed", payload: result })
              }
            >
              <span>{`${
                result.city
              }, ${result.country_code.toUpperCase()}`}</span>
            </div>
          ))
        : ""}
    </div>
  );
}

export default AutoCompleter;
