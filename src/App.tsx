import { useGeolocated } from "react-geolocated";
import "./App.css";
import { useState } from "react";
import CustomMap from "./CustomMap";
import { AppState, PageState } from "./utils/app-state.type";
import Home from "./pages/Home";
import IncidentMoment from "./pages/IncidentMoment";

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

  const currentUserPosition = {
    lat: userCords?.latitude ?? 0,
    lng: userCords?.longitude ?? 0,
  };

  if (currentPage === "home-stage") {
    return <Home goToPage={setCurrentPage} />;
  }

  if (currentPage === "incident-moment-stage") {
    return <IncidentMoment goToPage={setCurrentPage} />;
  }

  if (currentPage === "incident-picking")
    return (
      <CustomMap
        currentUserPosition={currentUserPosition}
        isGeoLocationAvailable={isGeolocationEnabled && isGeolocationAvailable}
        isLoading={!userCords}
        appState={appState}
        setAppState={setAppState}
      />
    );
}

export default App;
