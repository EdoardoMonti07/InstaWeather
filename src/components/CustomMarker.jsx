import { Marker, Popup } from "react-leaflet";
import useFetchWeather from "../hooks/useFetchWeather";
import loadIcon from "../helpers/loadIcon";

function CustomMarker({ position }) {
  const { weather } = useFetchWeather(position);
  if (!weather) return;
  const iconName = weather.weather[0].icon;
  const weatherIcon = loadIcon(iconName);
  return (
    <Marker position={position} icon={weatherIcon}>
      <Popup>
        <div className="popup">
          <h3>
            {weather.weather[0].description.slice(0, 1).toUpperCase() +
              weather.weather[0].description.slice(1)}
          </h3>
          <p>{weather.main.feels_like.toFixed(1)} C°</p>
        </div>
      </Popup>
    </Marker>
  );
}

export default CustomMarker;
