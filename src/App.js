import React, { useState, useEffect } from "react";
import {
  Box,
  Grid,
  Paper,
  Switch,
  Button,
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Avatar,
} from "@mui/material";
import { LoadScriptNext as LoadScript } from "@react-google-maps/api";
import MapComponent from "./components/MapComponent";
import SeismicDataCards from "./components/SeismicDataCards.js";
import { SeismicData as data } from "./SeismicData.js";
import MapIcon from "@mui/icons-material/Map";
import logo from "./images/bighorn.png";
const apiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;


const App = () => {
  // State to toggle between Map View and List View
  const [isMapView, setIsMapView] = useState(true);
  // State to store the search term (unused in provided code)
  const [searchTerm, setSearchTerm] = useState("");
  // State to store markers' data with coordinates
  const [markers, setMarkers] = useState([]);
  // State to store selected seismic events
  const [selectedData, setSelectedData] = useState([]);

  // Conditional styles based on whether it's Map View or List View
  const mapContainerStyle = isMapView ? { width: "100%", height: "100vh" } : { display: "none" };
  const dataContainerStyle = isMapView ? { display: "none" } : { padding: "2rem 2.5rem" };

  // UseEffect hook to fetch lat-long coordinates of seismic events using Google's Geocoding API
  useEffect(() => {
    const fetchLatLong = async () => {
      // Mapping over seismic events to fetch their coordinates
      const promises = data.map(async (event) => {
        try {
          const response = await fetch(
            `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
              event.location
            )}&key=${apiKey}`
          );
          const result = await response.json();
          if (result.results && result.results.length > 0) {
            const location = result.results[0].geometry.location;
            return {
              ...event,
              lat: location.lat,
              lng: location.lng,
            };
          } else {
            console.error("No results found for:", event.location);
            return event;
          }
        } catch (error) {
          console.error("Error fetching coordinates for:", event.location, error);
          return event;
        }
      });

      // Resolving all promises and updating the markers' state
      const newMarkers = await Promise.all(promises);
      setMarkers(newMarkers);
    };

    fetchLatLong();
  }, [data, apiKey, selectedData]);

  return (
    // Loading Google Maps script for the map component
    <LoadScript googleMapsApiKey={apiKey}>
      <div style={{ width: "100vw", maxWidth: "100%" }}>
        <Grid container>
          {/* App header with a switch to toggle between Map View and List View */}
          <AppBar position="static" color="primary">
            <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
              {/* App logo and title */}
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Avatar alt="Remy Sharp" src={logo} />
                <Typography variant="h6" component="div" sx={{ flexGrow: 1, padding: "0 0.125rem" }}>
                  GeoSheep
                </Typography>
              </Box>

              {/* Toggle switch for Map/List View */}
              <Box>
                {isMapView ? "Hide Map" : "Show Map"} 
                <Switch
                  checked={isMapView}
                  onChange={() => {
                    if (isMapView) setSelectedData(markers); // If toggling off the map view, display all seismic cards
                    setIsMapView(!isMapView);
                  }}
                  name="viewToggle"
                  inputProps={{ "aria-label": "Map/List View Toggle" }}
                />
              </Box>
            </Toolbar>
          </AppBar>

          {/* Main content: Map or List of Seismic Events */}
          <Grid item xs={12}>
            <Paper style={{ border: "none" }}>
              {/* Map View */}
              <div style={mapContainerStyle}>
                <MapComponent
                  markers={markers}
                  setSelectedData={setSelectedData}
                  setIsMapView={setIsMapView}
                />
              </div>
              {/* List View of Seismic Events */}
              <div style={dataContainerStyle}>
                <SeismicDataCards data={selectedData} />
                {/* Button to go back to Map View */}
                <Button
                  startIcon={<MapIcon />}
                  style={{ margin: "1rem auto", display: "flex" }}
                  variant="contained"
                  color="error"
                  onClick={() => {
                    setSelectedData([]);
                    setIsMapView(true);
                  }}
                >
                  Back to Map
                </Button>
              </div>
            </Paper>
          </Grid>
        </Grid>
      </div>
    </LoadScript>
  );
};

export default App;