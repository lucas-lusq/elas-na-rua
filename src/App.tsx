import { useGeolocated } from "react-geolocated";
import "./App.css";
// import { useGeolocated } from "react-geolocated";
import {
  APIProvider,
  Map,
  MapCameraChangedEvent,
  Marker,
} from "@vis.gl/react-google-maps";
import { useState } from "react";
import {
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  SwipeableDrawer,
  Typography,
} from "@mui/material";
import Icon from "@mui/material/Icon";
import WarningPickIncidentLocation from "./components/WarningPickIncidentLocation ";

type ReportedItem = {
  coordinate: {
    lat: number;
    lng: number;
  };
  incidentType?: IncidentType;
};

type IncidentType = {
  name: "assedio" | "rua-perigosa" | "iluminacao";
  iconName: string;
  description: string;
};

type IncidentSelectionState = "selecting-incident" | "incident-selected";

type AppState = {
  reportedItems: ReportedItem[];
  incidentSelectionState: IncidentSelectionState;
  stagingSelection?: ReportedItem;
};

const incidentOptions: IncidentType[] = [
  {
    description: "Assédio",
    iconName: "sentiment_very_dissatisfied",
    name: "assedio",
  },
  {
    description: "Rua escura",
    iconName: "tungsten",
    name: "iluminacao",
  },
  {
    description: "Cheio de cracudo",
    iconName: "warning",
    name: "rua-perigosa",
  },
];

function App() {
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
  const drawerBleeding = 56;
  const [appState, setAppState] = useState<AppState>({
    reportedItems: [],
    incidentSelectionState: "selecting-incident",
  });

  if (!isGeolocationEnabled || !isGeolocationAvailable) {
    return <div>Geolocation is not enabled</div>;
  }

  if (!userCords) {
    return <div>Getting the location data&hellip; </div>;
  }

  const mapsKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
  const currentUserPosition = {
    lat: userCords.latitude,
    lng: userCords.longitude,
  };

  const isDrawerVisible =
    appState.incidentSelectionState === "incident-selected";

  return (
    <div
      style={{
        height: "100vh",
        width: "100vw",
        padding: 0,
        margin: 0,
        overflow: "hidden",
      }}
    >
      <APIProvider
        apiKey={mapsKey}
        onLoad={() => console.log("Maps API has loaded.")}
      >
        <WarningPickIncidentLocation />
        <Map
          defaultZoom={18}
          mapTypeControl={false}
          zoomControl={false}
          streetViewControl={false}
          fullscreenControl={false}
          defaultCenter={currentUserPosition}
          onCameraChanged={(ev: MapCameraChangedEvent) =>
            console.log(
              "camera changed:",
              ev.detail.center,
              "zoom:",
              ev.detail.zoom
            )
          }
          onClick={(e) => {
            if (!e.detail.latLng) return;

            setAppState({
              ...appState,
              stagingSelection: { coordinate: e.detail.latLng },
              incidentSelectionState: "incident-selected",
            });
          }}
        >
          <Marker position={currentUserPosition} />
          {appState &&
            appState.reportedItems.map((item, index) => {
              return <Marker key={index} position={item.coordinate} />;
            })}
        </Map>
      </APIProvider>

      <SwipeableDrawer
        anchor="bottom"
        open={isDrawerVisible}
        onClose={() =>
          setAppState({
            ...appState,
            incidentSelectionState: "selecting-incident",
            stagingSelection: undefined,
          })
        }
        onOpen={() => {}}
        swipeAreaWidth={drawerBleeding}
        disableSwipeToOpen={true}
        ModalProps={{
          keepMounted: true,
        }}
      >
        <Typography sx={{ p: 2, color: "text.secondary" }}>
          Escolher incidente
        </Typography>
        <List>
          {incidentOptions.map(({ description, iconName, name }, index) => (
            <ListItem key={index} disablePadding>
              <ListItemButton
                onClick={() => {
                  if (!appState.stagingSelection) {
                    return setAppState({
                      ...appState,
                      incidentSelectionState: "selecting-incident",
                      stagingSelection: undefined,
                    });
                  }

                  const newItem = {
                    ...appState.stagingSelection,
                    incidentType: {
                      name,
                      iconName,
                      description,
                    },
                  };

                  setAppState({
                    ...appState,
                    reportedItems: [...appState.reportedItems, newItem],
                    incidentSelectionState: "selecting-incident",
                    stagingSelection: undefined,
                  });
                }}
              >
                <Icon>{iconName}</Icon>
                <ListItemText primary={description} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </SwipeableDrawer>
    </div>
  );
}

export default App;
