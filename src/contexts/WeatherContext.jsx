import { createContext, useContext, useEffect, useReducer } from "react";

const WeatherContext = createContext();

const initialState = {
  currentCity: "",
  position: [],
  results: [],
  query: "",
  markers: [],
  selDate: "",
  selTime: "",
  error: "",
};

function reducer(state, action) {
  switch (action.type) {
    case "city/changed":
      return {
        ...state,
        currentCity: action.payload,
        query: "",
        results: [],
        markers: [],
      };
    case "position/changed":
      return { ...state, position: action.payload };
    case "query/changed":
      return { ...state, query: action.payload };
    case "results/changed":
      return { ...state, results: action.payload };
    case "markers/created":
      return { ...state, markers: action.payload };
    case "selDate/changed":
      return { ...state, selDate: action.payload };
    case "selTime/changed":
      return { ...state, selTime: action.payload };
    case "error/new":
      return { ...initialState, error: action.payload };
    default:
      throw new Error("Unknown action!");
  }
}

function WeatherProvider({ children }) {
  const [
    { currentCity, position, results, query, markers, selDate, selTime, error },
    dispatch,
  ] = useReducer(reducer, initialState);

  // Getting autocompleter suggestions
  const API_KEY = "8d276fef0535488b97034dc9e6e3f8e9";
  const MIN_ADDRESS_LENGTH = 3;
  useEffect(
    function () {
      async function fetchResults() {
        try {
          if (query.length < MIN_ADDRESS_LENGTH) {
            dispatch({ type: "results/changed", payload: [] });
            return;
          }
          const fetched = await fetch(
            `https://api.geoapify.com/v1/geocode/autocomplete?text=${encodeURIComponent(
              query
            )}&type=city&format=json&limit=5&apiKey=${API_KEY}`
          );
          const data = await fetched.json();

          //TODO
          // temporary
          if (!data) console.log("No autocompleter data available");

          dispatch({ type: "results/changed", payload: data.results });
        } catch (err) {
          console.error(`⛔ ${err.message}`);
        }
      }

      fetchResults();
    },
    [query]
  );

  return (
    <WeatherContext.Provider
      value={{
        currentCity,
        position,
        results,
        query,
        markers,
        selDate,
        selTime,
        error,
        dispatch,
      }}
    >
      {children}
    </WeatherContext.Provider>
  );
}

function useWeather() {
  const context = useContext(WeatherContext);
  if (context === undefined)
    throw new Error("WeatherContext was used ouside the SelectionProvider");
  return context;
}

export { WeatherProvider, useWeather };
