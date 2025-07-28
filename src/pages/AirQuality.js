import React, { useState } from "react";
import GaugeComponent from "react-gauge-component"; // npm install react-gauge-component

import "./AirQuality.css";

const AirQuality = () => {
  const [city, setCity] = useState("");
  const [citySuggestions, setCitySuggestions] = useState([]);
  const [selectedCity, setSelectedCity] = useState(null);
  const [filter, setFilter] = useState("MPR 1550");
  const [lastDate, setLastDate] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [pollutionData, setPollutionData] = useState(null);
  const [filterUsage, setFilterUsage] = useState(0);
  const [suggestedDate, setSuggestedDate] = useState("");

  // Fetch city suggestions using Open-Meteo Geocoding API
  const fetchCitySuggestions = async (query) => {
    if (!query) return setCitySuggestions([]);
    try {
      const res = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${query}&count=5`
      );
      const data = await res.json();
      setCitySuggestions(data.results || []);
    } catch (err) {
      console.error("Error fetching city suggestions:", err);
    }
  };

  // Fetch weather and air quality data
  const handleFetchData = async () => {
    if (!selectedCity) return alert("Please select a city from the suggestions.");
    const { latitude, longitude } = selectedCity;

    try {
      // Fetch Weather API (Temperature & Humidity)
      const weatherRes = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`
      );
      const weatherJson = await weatherRes.json();

      // Fetch Air Quality API (PM, AQI, etc.)
      const airQualityRes = await fetch(
        `https://air-quality-api.open-meteo.com/v1/air-quality?latitude=${latitude}&longitude=${longitude}&hourly=pm10,pm2_5,us_aqi`
      );
      const airQualityJson = await airQualityRes.json();

      setWeatherData(weatherJson);
      setPollutionData(airQualityJson);

      // Calculate filter usage and recommended date
      const usage = calculateFilterUsage(lastDate, airQualityJson);
      setFilterUsage(usage);

      const nextDate = calculateNextReplacement(lastDate, filter, usage);
      setSuggestedDate(nextDate);
    } catch (err) {
      console.error("Error fetching data:", err);
    }
  };

  // Convert Celsius to Fahrenheit
  const cToF = (celsius) => (celsius * 9) / 5 + 32;

  // Estimate filter usage
  const calculateFilterUsage = (lastDate, pollution) => {
    const daysSince = (new Date() - new Date(lastDate)) / (1000 * 3600 * 24);
    const exposureFactor = pollution?.hourly?.pm10?.[0] || 1;
    return Math.min(100, Math.round((daysSince * exposureFactor) / 10));
  };

  // Estimate next replacement date
  const calculateNextReplacement = (lastDate, filter, usage) => {
    const lifeDays = filter === "MPR 1550" ? 90 : 60;
    const remaining = Math.max(0, lifeDays - (usage / 100) * lifeDays);
    const next = new Date(new Date(lastDate).getTime() + remaining * 24 * 60 * 60 * 1000);
    return next.toLocaleDateString();
  };

  // Helper to get air quality group
    const getAirQualityGroup = (value, type) => {
      if (value == null) return { label: "N/A", color: "aq-na" };

      let group = "N/A";
      let color = "aq-na";

      if (type === "PM10") {
        if (value <= 54) { group = "Good"; color = "aq-good"; }
        else if (value <= 154) { group = "Moderate"; color = "aq-moderate"; }
        else if (value <= 254) { group = "Unhealthy (Sensitive)"; color = "aq-unhealthy-sensitive"; }
        else if (value <= 354) { group = "Unhealthy"; color = "aq-unhealthy"; }
        else if (value <= 424) { group = "Very Unhealthy"; color = "aq-very-unhealthy"; }
        else { group = "Hazardous"; color = "aq-hazardous"; }
      }

      if (type === "PM2.5") {
        if (value <= 12) { group = "Good"; color = "aq-good"; }
        else if (value <= 35.4) { group = "Moderate"; color = "aq-moderate"; }
        else if (value <= 55.4) { group = "Unhealthy (Sensitive)"; color = "aq-unhealthy-sensitive"; }
        else if (value <= 150.4) { group = "Unhealthy"; color = "aq-unhealthy"; }
        else if (value <= 250.4) { group = "Very Unhealthy"; color = "aq-very-unhealthy"; }
        else { group = "Hazardous"; color = "aq-hazardous"; }
      }

      return { label: group, color };
    };
    
    //Helper to get AQI Severity
    const getAQISeverity = (value) => {
    if (value <= 50) return { label: "Good", color: "#00e400" }; // Green
    if (value <= 100) return { label: "Moderate", color: "#ffff00" }; // Yellow
    if (value <= 150) return { label: "Unhealthy (Sensitive)", color: "#ff7e00" }; // Orange
    if (value <= 200) return { label: "Unhealthy", color: "#ff0000" }; // Red
    if (value <= 300) return { label: "Very Unhealthy", color: "#8f3f97" }; // Purple
    return { label: "Hazardous", color: "#7e0023" }; // Maroon
  };
  
  return (
    <div className="airquality-container">
      <h1>🌬️ Air Quality Tracker</h1>

      <div className="form-card">
        <label htmlFor="city">Where do you live?</label>
        <input
          id="city"
          type="text"
          placeholder="Enter your city"
          value={city}
          onChange={(e) => {
            setCity(e.target.value);
            fetchCitySuggestions(e.target.value);
          }}
        />

        {citySuggestions.length > 0 && (
          <ul className="suggestions">
            {citySuggestions.map((suggestion) => (
              <li
                key={suggestion.id}
                onClick={() => {
                  setSelectedCity(suggestion);
                  setCity(`${suggestion.name}, ${suggestion.country}`);
                  setCitySuggestions([]);
                }}
              >
                {suggestion.name}, {suggestion.admin1}, {suggestion.country}
              </li>
            ))}
          </ul>
        )}

        <label htmlFor="filter">Which filter do you have?</label>
        <select
          id="filter"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="MPR 1550">MPR 1550</option>
          <option value="MPR 1000">MPR 1000</option>
        </select>

        <label htmlFor="date">When did you last replace it?</label>
        <input
          id="date"
          type="date"
          value={lastDate}
          onChange={(e) => setLastDate(e.target.value)}
        />

        <button onClick={handleFetchData}>Check Air Quality</button>
      </div>

      
      {pollutionData && pollutionData.hourly?.us_aqi?.[0] && (
        <div className="gauge-container">
          <div className="gauge-container">
            <GaugeComponent
              value={pollutionData.hourly.us_aqi[0] ?? 0}
              minValue={0}
              maxValue={500}
              type="semicircle"
              arc={{
                gradient: false, // NO blending
                colorArray: ["#00e400", "#ffff00", "#ff7e00", "#ff0000", "#8f3f97", "#7e0023"],
                padding: 0.02, // Small gap between ranges
                subArcs: [
                  { limit: 50 },   // 🟢 Good: 0–50
                  { limit: 100 },  // 🟡 Moderate: 51–100
                  { limit: 150 },  // 🟠 Sensitive: 101–150
                  { limit: 200 },  // 🔴 Unhealthy: 151–200
                  { limit: 300 },  // 🟣 Very Unhealthy: 201–300
                  { limit: 500 }   // 🟤 Hazardous: 301–500
                ]
              }}
              pointer={{ type: "arrow", color: "#000" }}
              animate={false}
              labels={{
                valueLabel: {
                  formatTextValue: () => {
                    const aqiValue = pollutionData.hourly.us_aqi[0];
                    const severity = getAQISeverity(aqiValue);
                    return `AQI: ${aqiValue} (${severity.label})`;
                  },
                  style: {
                    fontSize: "34px",
                    fontWeight: "700",
                    fill: "#272525ff", 
                    background: "rgba(255, 255, 255, 0.8)",
                    padding: "8px 14px",
                    borderRadius: "10px"
                  }
                }
              }}
            />
          </div>
        </div>
      )}

      {weatherData && weatherData.current_weather && (
        <div className="info-card">
          <h2>Current Conditions in {city}</h2>
          <p>
            🌡️ Temp: {cToF(weatherData.current_weather.temperature).toFixed(1)}°F
          </p>
          <p>
            💨 Windspeed: {weatherData.current_weather.windspeed} km/h
          </p>
        </div>
      )}

      {pollutionData && pollutionData.hourly && (
        <div className="info-card">
          <h3>🦠 Air Quality Data</h3>
          <p>
            PM10: {pollutionData.hourly.pm10?.[0] ?? "N/A"} µg/m³
            {pollutionData.hourly.pm10 && (
              <span className={`aq-group ${getAirQualityGroup(pollutionData.hourly.pm10?.[0], "PM10").color}`}>
                {getAirQualityGroup(pollutionData.hourly.pm10?.[0], "PM10").label}
              </span>
            )}
          </p>
          <p>
            PM2.5: {pollutionData.hourly.pm2_5?.[0] ?? "N/A"} µg/m³
            {pollutionData.hourly.pm2_5 && (
              <span className={`aq-group ${getAirQualityGroup(pollutionData.hourly.pm2_5?.[0], "PM2.5").color}`}>
                {getAirQualityGroup(pollutionData.hourly.pm2_5?.[0], "PM2.5").label}
              </span>
            )}
          </p>
          <p>🔋 Filter Usage: {filterUsage}%</p>
        </div>
      )}

      {suggestedDate && (
        <div className="info-card">
          <h3>🛠 Replacement Recommendation</h3>
          <p>Next Replacement Date: {suggestedDate}</p>
          <a
            href={
              filter === "MPR 1550"
                ? "https://www.amazon.com/Filtrete-Refillable-Reusable-Honeywell-Allergen/dp/B0DYQ4XZX7/ref=sr_1_2?crid=5KW1RA1C0GGY&dib=eyJ2IjoiMSJ9.nGcYuvQ-zxfY6qQJPdLu9MOumopqU3kqP1HV9HPWoorcP587Oc74EQn5J8VJdybsqHgkISZjdE3bXWJdjsCfp-2sdGJug-yys0w2DBFWrzh6K61GmnRPXefGopi3A76IFFa8ufYrlsODnMTqbAJgJi16CZNzwMfXQmnJWvFLGwlr6IInbEFKDfCPR5zqzoqjCnM4nFP8xnMmIH3XXQ8NiH-ktywpr84cEB7et40Zr3qSCUgrTxbzZvGrmuAbMqkUG6SD7W6d6bhXm54wm-RPvgi3kolIznmyp_dEw4S05Qo.yf40U-IzMRqEfvz3F355TiUT-bArZe9-MipOg9ZPnBM&dib_tag=se&keywords=filtrete%2Brefillable%2Bair%2Bfilter&qid=1753714596&sprefix=filtrete%2Brefilla%2Caps%2C204&sr=8-2&th=1"
                : "https://www.amazon.com/Filtrete-Refillable-Reusable-Honeywell-Allergen/dp/B0DYQ4RWW6/ref=sr_1_2?crid=5KW1RA1C0GGY&dib=eyJ2IjoiMSJ9.nGcYuvQ-zxfY6qQJPdLu9MOumopqU3kqP1HV9HPWoorcP587Oc74EQn5J8VJdybsqHgkISZjdE3bXWJdjsCfp-2sdGJug-yys0w2DBFWrzh6K61GmnRPXefGopi3A76IFFa8ufYrlsODnMTqbAJgJi16CZNzwMfXQmnJWvFLGwlr6IInbEFKDfCPR5zqzoqjCnM4nFP8xnMmIH3XXQ8NiH-ktywpr84cEB7et40Zr3qSCUgrTxbzZvGrmuAbMqkUG6SD7W6d6bhXm54wm-RPvgi3kolIznmyp_dEw4S05Qo.yf40U-IzMRqEfvz3F355TiUT-bArZe9-MipOg9ZPnBM&dib_tag=se&keywords=filtrete%2Brefillable%2Bair%2Bfilter&qid=1753714596&sprefix=filtrete%2Brefilla%2Caps%2C204&sr=8-2&th=1https://www.amazon.com/Filtrete-Refillable-Reusable-Honeywell-Allergen/dp/B0DYQ4RWW6/ref=sr_1_2?crid=5KW1RA1C0GGY&dib=eyJ2IjoiMSJ9.nGcYuvQ-zxfY6qQJPdLu9MOumopqU3kqP1HV9HPWoorcP587Oc74EQn5J8VJdybsqHgkISZjdE3bXWJdjsCfp-2sdGJug-yys0w2DBFWrzh6K61GmnRPXefGopi3A76IFFa8ufYrlsODnMTqbAJgJi16CZNzwMfXQmnJWvFLGwlr6IInbEFKDfCPR5zqzoqjCnM4nFP8xnMmIH3XXQ8NiH-ktywpr84cEB7et40Zr3qSCUgrTxbzZvGrmuAbMqkUG6SD7W6d6bhXm54wm-RPvgi3kolIznmyp_dEw4S05Qo.yf40U-IzMRqEfvz3F355TiUT-bArZe9-MipOg9ZPnBM&dib_tag=se&keywords=filtrete%2Brefillable%2Bair%2Bfilter&qid=1753714596&sprefix=filtrete%2Brefilla%2Caps%2C204&sr=8-2&th=1"
            }
            target="_blank"
            rel="noopener noreferrer"
          >
            Buy {filter} on Amazon
          </a>
        </div>
      )}
    </div>
  );
};

export default AirQuality;
