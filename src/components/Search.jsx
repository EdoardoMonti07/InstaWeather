import { useWeather } from "../contexts/WeatherContext";
import styles from "./Search.module.css";

function Search() {
  const { results, query, dispatch } = useWeather();

  return (
    <form
      action=""
      className={styles.searchbarContainer}
      onSubmit={(e) => {
        e.preventDefault();
        dispatch({ type: "city/changed", payload: results.at(0) });
      }}
    >
      <input
        type="text"
        className={styles.searchInput}
        placeholder="Search..."
        value={query}
        onChange={(e) =>
          dispatch({ type: "query/changed", payload: e.target.value })
        }
      />
      <button type="submit" className={styles.searchButton}>
        <img className={styles.searchIcon} src="search.png" alt="" />
      </button>
    </form>
  );
}

export default Search;
