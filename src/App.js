import React, { useState } from "react";
import axios from "axios";
import arrow from "./assets/down-arrow.svg";
import { FaSearchLocation } from "react-icons/fa";

const { REACT_APP_OPENWEATHERMAP_API_ID  } = process.env

function App() {
  const [data, setData] = useState({});
  const [location, setLocation] = useState("");


  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${REACT_APP_OPENWEATHERMAP_API_ID}`;

  const searchLocation = (event) => {
    if (event.key === "Enter") {
      axios.get(url).then((response) => {
        setData(response.data);
        console.log(response.data);
      });
      setLocation("");
    }
  };

  return (
    <div className="app">
      <div className="group">
        <p className="confam">WEATHER 911</p>
        <p className="footer">Developed by Ifeanyi Umeh</p>
      </div>
      <div className="search">
        <img src={arrow} alt="" className="arrow" />
        <div className="inputs">
          <input
            value={location}
            onChange={(event) => setLocation(event.target.value)}
            onKeyPress={searchLocation}
            placeholder="Enter Location"
            type="text"
          />
          {/* <button className="button" onClick={searchLocation}>
            <FaSearchLocation size={25} className="icon"/>
          </button> */}
        </div>
      </div>
      <div className="container">
        <div className="top">
          <div className="location">
            <p>{data.name}</p>
          </div>
          <div className="temp">
            {data.main ? <h1>{data.main.temp.toFixed()}°C</h1> : null}
          </div>
          <div className="description">
            {data.weather ? <p>{data.weather[0].main}</p> : null}
          </div>
        </div>

        {data.name !== undefined && (
          <div className="bottom">
            <div className="feels">
              {data.main ? (
                <p className="bold">{data.main.feels_like.toFixed()}°C</p>
              ) : null}
              <p className="desc">Feels Like</p>
            </div>
            <div className="humidity">
              {data.main ? <p className="bold">{data.main.humidity}%</p> : null}
              <p className="desc">Humidity</p>
            </div>
            <div className="wind">
              {data.wind ? (
                <p className="bold">{data.wind.speed.toFixed()} MPH</p>
              ) : null}
              <p className="desc">Wind Speed</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
