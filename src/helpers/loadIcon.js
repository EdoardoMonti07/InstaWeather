import L from "leaflet";

function loadIcon(iconName) {
  // Loading weather icons
  const icon = L.icon({
    iconUrl: `/InstaWeather/weather_icons/${iconName}.png`,
    className: "animated-icon",

    iconSize: [100, 100], // size of the icon
    shadowSize: [50, 64], // size of the shadow
    iconAnchor: [50, 60], // point of the icon which will correspond to marker's location
    shadowAnchor: [4, 62], // the same for the shadow
    popupAnchor: [-3, -76], // point from which the popup should open relative to the iconAnchor
  });

  return icon;
}

export default loadIcon;
