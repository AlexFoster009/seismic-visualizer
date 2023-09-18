import React from "react";
import { GoogleMap, Marker } from "@react-google-maps/api";

const MapComponent = React.memo(
  ({ markers, setSelectedData, setIsMapView }) => {
    const onMarkerClick = React.useCallback(
      (clickedMarker) => {
        // Filter all events that match the clicked marker's location
        const eventsForLocation = markers.filter(
          (marker) => marker.location === clickedMarker.location
        );
        setSelectedData(eventsForLocation);
        setIsMapView(false); // Switch to list view
      },
      [setSelectedData, markers, setIsMapView]
    );

    return (
      <GoogleMap
        mapContainerStyle={{ width: "100%", height: "100%" }}
        center={{ lat: 53.5444, lng: -113.4909 }}
        zoom={7}
      >
            {markers.map((marker) => (
            //Display all of the markers on the map from the location lat/lng values
          <Marker
            key={marker.id}
            position={{ lat: marker.lat, lng: marker.lng }}
            title={marker.location}
            onClick={() => onMarkerClick(marker)}
          />
        ))}
      </GoogleMap>
    );
  }
);

export default MapComponent;