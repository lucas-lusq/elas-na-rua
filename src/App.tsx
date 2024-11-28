import { useGeolocated } from "react-geolocated";
import "./App.css";
import { useEffect, useState } from "react";
import CustomMap from "./CustomMap";
import { AppState, Coordinates, PageState } from "./utils/app-state.type";
import Home from "./pages/Home";
import IncidentMoment from "./pages/IncidentMoment";
import SearchForLocation from "./pages/SearchForLocation";

function App() {
  const [currentPage, setCurrentPage] = useState<PageState>("home-stage");
  const {
    coords: userCords,
    isGeolocationAvailable,
    isGeolocationEnabled,
  } = useGeolocated({
    positionOptions: {
      enableHighAccuracy: false,
    },
    userDecisionTimeout: 5000,
  });
  const [appState, setAppState] = useState<AppState>({
    reportedItems: [],
    incidentSelectionState: "selecting-incident",
  });
  const [userLocation, setUserLocation] = useState<Coordinates | undefined>(
    undefined
  );

  useEffect(() => {
    console.log("aqui332");
    if (userCords && userLocation === undefined) {
      setUserLocation({ lat: userCords?.latitude, lng: userCords?.longitude });
    }
  }, [userCords, userLocation]);

  useEffect(() => {
    console.log("aqui222");
    if (
      currentPage === "incident-moment-stage" &&
      userLocation != undefined &&
      userCords &&
      JSON.stringify(userLocation) !=
        JSON.stringify({ lat: userCords.latitude, lng: userCords.longitude })
    ) {
      setUserLocation({ lat: userCords.latitude, lng: userCords.longitude });
    }
  }, [currentPage, userCords, userLocation]);

  if (currentPage === "home-stage") {
    return <Home goToPage={setCurrentPage} />;
  }

  if (currentPage === "incident-moment-stage") {
    return <IncidentMoment goToPage={setCurrentPage} />;
  }

  if (currentPage === "incident-picking" && userLocation)
    return (
      <CustomMap
        currentUserPosition={userLocation}
        isGeoLocationAvailable={isGeolocationEnabled && isGeolocationAvailable}
        isLoading={!userCords}
        appState={appState}
        setAppState={setAppState}
        goToPage={setCurrentPage}
      />
    );

  if (currentPage === "search-incident-location")
    return (
      <SearchForLocation
        goToPage={setCurrentPage}
        setUserLocation={setUserLocation}
      />
    );
}

export default App;
