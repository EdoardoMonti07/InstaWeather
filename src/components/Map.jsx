import randomLocation from "random-location";
import { MapContainer, TileLayer, useMap } from "react-leaflet";
import styles from "./Map.module.css";
import useUserLocation from "../hooks/useUserLocation";
import { ThreeDots as Loader } from "react-loader-spinner";
import { useWeather } from "../contexts/WeatherContext";
import CustomMarker from "./CustomMarker";
import Error from "./Error";
import { useEffect, useRef } from "react";

function Map() {
  const ZOOM_LEVEL = 8;

  const [userPosition, isLoading] = useUserLocation();
  const { currentCity, error } = useWeather();
  const { dispatch, markers } = useWeather();
  const mapRef = useRef(null);

  useEffect(() => {
    const mapEl = mapRef.current;
    mapEl.addEventListener("click", () => {
      dispatch({ type: "results/changed", payload: [] });
      dispatch({ type: "query/changed", payload: "" });
    });
  }, [dispatch]);

  function SetMapView({ coords, zoom }) {
    const map = useMap();
    map.setView(coords, zoom);
    return null;
  }

  function CalcMarkers({ coords }) {
    useEffect(() => {
      const center = {
        latitude: coords[0],
        longitude: coords[1],
      };
      const radius = 300000; // meters
      const COUNT = 100;

      const points = [];
      for (let i = 0; i < COUNT; i++) {
        const randomPoint = randomLocation.randomCirclePoint(center, radius);
        points.push(randomPoint);
      }

      // Check if point is too near
      const filteredPoints = points.filter((point, index) => {
        for (let i = 0; i < points.length; i++) {
          if (
            i !== index &&
            Math.floor(randomLocation.distance(point, points[i])) < 40000
          ) {
            return false; // If too close to another point, discard it
          }
        }
        return true; // If not too close to any other point, keep it
      });

      console.log(filteredPoints);

      const markers = filteredPoints.map((point) => [
        point.latitude,
        point.longitude,
      ]);
      markers.push(coords);
      dispatch({ type: "markers/created", payload: markers });
    }, [coords]); // Ensure this effect runs when coords or dispatch change

    return null;
  }

  return (
    <div className={styles.mapContainer} ref={mapRef}>
      {!isLoading && userPosition ? (
        <MapContainer
          center={userPosition}
          zoom={ZOOM_LEVEL}
          // scrollWheelZoom={false}
          className={styles.map}
          dragging={false}
          doubleClickZoom={false}
          zoomControl={false}
        >
          <TileLayer
            url="https://tile.jawg.io/dba74639-5732-4cb5-b2a7-9f0d62cb8bc7/{z}/{x}/{y}{r}.png?access-token=0l6zyPaWqY5FDRH8VEPKzZn1xtLe5xc7j0UQan08tnD3DnV8Gi7vgYlGBZBHhdiN"
            attribution='&copy; <a href="https://www.jawg.io?utm_medium=map&utm_source=attribution" target="_blank">Jawg</a> - <a href="https://www.openstreetmap.org?utm_medium=map-attribution&utm_source=jawg" target="_blank">OpenStreetMap</a> contributors'
          />
          {markers.length &&
            markers.map((marker) => (
              <CustomMarker
                position={marker}
                key={marker.join(", ")}
              ></CustomMarker>
            ))}
          {currentCity && (
            <>
              <SetMapView
                coords={[currentCity.lat, currentCity.lon]}
                zoom={ZOOM_LEVEL}
              />
              {!markers.length && (
                <CalcMarkers coords={[currentCity.lat, currentCity.lon]} />
              )}
            </>
          )}
        </MapContainer>
      ) : (
        <Loader
          visible={true}
          width="150"
          color="#4fa94d"
          radius="9"
          ariaLabel="three-dots-loading"
        />
      )}
      {error && <Error />}
    </div>
  );
}

export default Map;
