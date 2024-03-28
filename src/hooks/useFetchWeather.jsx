import { useEffect, useState } from "react";
import { useWeather } from "../contexts/WeatherContext";

function useFetchWeather(coords) {
  const { selDate, selTime, dispatch } = useWeather();
  const [weather, setWeather] = useState(null);

  // Fetching weather data for each coordinate array
  useEffect(() => {
    async function fetchWeather(coords) {
      try {
        if (!selDate || !selTime || !coords)
          throw new Error(
            "Invalid input selection! Please provide all the information needed..."
          );
        const API_KEY = "9ff3923b484a3d50ef883e40083922cf";
        const [lat, lon] = coords;
        const data = await fetch(
          `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`
        );

        if (!data.ok) throw new Error("Couldn't load weather data!");
        const weatherData = await data.json();

        const selectedWeather = weatherData.list.find(
          (obj) =>
            obj.dt_txt ===
            `${selDate.replace(/\s/g, "")} ${selTime.replace(/\s/g, "")}:00`
        );

        setWeather(selectedWeather);
      } catch (error) {
        dispatch({ type: "error/new", payload: error.message });
      }
    }
    fetchWeather(coords);
  }, [coords, selDate, selTime, dispatch]);

  return { weather };
}

export default useFetchWeather;
