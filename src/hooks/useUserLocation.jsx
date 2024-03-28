import { useEffect, useState } from "react";

function useUserLocation() {
  const [position, setPosition] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(function () {
    if (!navigator.geolocation)
      throw Error("Your browser does not support geolocation!");

    setIsLoading(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setPosition([pos.coords.latitude, pos.coords.longitude]);
        setIsLoading(false);
      },
      () => {
        setIsLoading(false);
        alert("Could not get your position!");
      }
    );
  }, []);

  return [position, isLoading];
}

export default useUserLocation;
