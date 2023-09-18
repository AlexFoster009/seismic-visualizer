import React, { useState, useEffect } from "react";
import {
  Box,
  Chip,
  Card,
  CardMedia,
  Stack,
  IconButton,
  TextField,
  Select,
  MenuItem,
  Slider,
  FormControl,
  InputLabel,
  Typography,
  Tooltip,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import SeismicChart from "./SeismicChart";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { format } from "date-fns";
import CrisisAlertIcon from "@mui/icons-material/CrisisAlert";
import calgaryImg from "../images/calgary.jpg";
import banffImg from "../images/banff.jpg";
import kananaskisImg from "../images/banff.jpg";
import canmoreImg from "../images/banff.jpg";
import jasperImg from "../images/banff.jpg";
import lakelouiseImg from "../images/banff.jpg";

const SeismicDataCards = ({ data }) => {
 // State for toggling the chart's visibility
  const [isChartVisible, setIsChartVisible] = useState(false);
  // State for the filtered seismic data
  const [filteredData, setFilteredData] = useState(data);
  // States for filtering options: search term, selected event type, magnitude range, and date range
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [magnitudeRange, setMagnitudeRange] = useState([0, 10]);
  const [dateRange, setDateRange] = useState([ // set date range for start/end date filters
    new Date("2020-01-01"),
    new Date(),
  ]);
    
     // Color definitions for different event types
  const typeColors = {
    ABG: "rgba(255, 99, 132, 1)",
    BEG: "rgba(75, 192, 192, 1)",
    AIR: "rgba(255, 206, 86, 1)",
    SUB: "rgba(153, 102, 255, 1)",
  };
    
// Helper function to map location names to their respective images
  const getImageForLocation = (location) => {
    const images = {
      "Calgary, Alberta": calgaryImg,
      "Banff National Park, Alberta": banffImg,
      "Kananaskis Country, Alberta": kananaskisImg,
      "Lake Louise, Alberta": lakelouiseImg,
      "Jasper National Park, Alberta": jasperImg,
      "Canmore, Alberta": canmoreImg,
    };

    for (let loc in images) {
      if (location.includes(loc)) {
        return images[loc];
      }
    }
    return ""; // default image or a placeholder can be set here
  };
    
  // Effect hook to apply filtering whenever data or filter settings change
  useEffect(() => {
    let filtered = data;
    if (searchTerm) {
      filtered = filtered.filter((event) =>
        event.location.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    if (selectedType) {
      filtered = filtered.filter((event) => event.type === selectedType);
    }
    filtered = filtered.filter(
      (event) =>
        event.magnitude >= magnitudeRange[0] &&
        event.magnitude <= magnitudeRange[1]
    );
    filtered = filtered.filter(
      (event) =>
        new Date(event.timestamp) >= dateRange[0] &&
        new Date(event.timestamp) <= dateRange[1]
    );

    setFilteredData(filtered);
  }, [data, searchTerm, selectedType, magnitudeRange, dateRange]);

  // Extract unique event types for the event types select dropdown filter
  const uniqueTypes = [...new Set(data.map((item) => item.type))];

  return (
    <div>
    {/* Filtering UI Components */}
          
      <TextField
        fullWidth
        variant="outlined"
        margin="normal"
        placeholder="Search..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <FormControl fullWidth variant="outlined" margin="normal">
        <InputLabel>Type</InputLabel>
        <Select
          value={selectedType}
          onChange={(e) => setSelectedType(e.target.value)}
          label="Type"
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          {uniqueTypes.map((type) => (
            <MenuItem key={type} value={type}>
              {type}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <Box sx={{ margin: "1rem 0" }}>
        <Typography id="input-slider" gutterBottom>
          Magnitude
        </Typography>
        <Slider
          value={magnitudeRange}
          onChange={(event, newValue) => setMagnitudeRange(newValue)}
          valueLabelDisplay="auto"
          min={0}
          max={5}
          step={0.1}
          margin="normal"
        />
      </Box>

      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Box>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              label="Start Date"
              value={dateRange[0]}
              onChange={(newValue) => setDateRange([newValue, dateRange[1]])}
              renderInput={(params) => (
                <TextField {...params} margin="normal" />
              )}
            />

            <DatePicker
              label="End Date"
              value={dateRange[1]}
              onChange={(newValue) => setDateRange([dateRange[0], newValue])}
              renderInput={(params) => (
                <TextField {...params} margin="normal" />
              )}
            />
          </LocalizationProvider>
        </Box>

        <Box sx={{ display: "flex", alignItems: "center" }}>
          {isChartVisible ? "Hide Chart" : "Show Chart"}
          <IconButton onClick={() => setIsChartVisible(!isChartVisible)}>
            {isChartVisible ? <VisibilityOffIcon /> : <VisibilityIcon />}
          </IconButton>
        </Box>
          </Box>
     {/* Render seismic events in card format if chart is not visible */}
      <Stack spacing={2} mt={2}>
        {!isChartVisible &&
          filteredData.map((event) => (
            <Card elevation={3} sx={{ display: "flex" }} key={event.id}>
              <CardMedia
                component="img"
                sx={{ width: 151 }}
                image={getImageForLocation(event.location)}
                alt="Live from space album cover"
              />
              <Box
                sx={{
                  padding: "1rem 1.75rem",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                }}
              >
                <Typography component="div" variant="h6">
                  {event.location}
                </Typography>
                <div>
                  {format(new Date(event.timestamp), "MMMM dd, yyyy, h:mm a")}
                </div>
                <div style={{ padding: "0.75rem 0" }}>
                  <Tooltip
                    title="Magnitude"
                    placement="right-start"
                    disableFocusListener
                  >
                    <Chip
                      icon={<CrisisAlertIcon />}
                      label={event.magnitude}
                      variant="outlined"
                    />
                  </Tooltip>
                </div>
                <Tooltip
                  title="Event Type"
                  placement="right-start"
                  disableFocusListener
                >
                  <Chip
                    size="small"
                    label={event.type}
                    style={{ backgroundColor: typeColors[event.type] }}
                  />
                </Tooltip>
              </Box>
            </Card>
          ))}
      </Stack>
       {/* If the chart visibility is toggled on, display the SeismicChart component */}          
      {isChartVisible && <SeismicChart data={filteredData} />}
    </div>
  );
};

export default SeismicDataCards;
