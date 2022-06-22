import React, { useState } from "react";
import axios from "axios";
import arrow from "./assets/down-arrow.svg";
import { FaSearchLocation } from "react-icons/fa";
import Moment from "react-moment";
import "moment-timezone";

const { REACT_APP_OPENWEATHERMAP_API_ID } = process.env;

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

  // Date function
  let today2 = new Date();
  // console.log(today)
  let date =
    today2.getDate() + "/" + today2.getMonth() + "/" + today2.getFullYear();

  // Time function

  let today = new Date();

  let greeting = () => {
    if (today.getHours() >= 24 && today.getHours() < 11) {
      return (
        <p className="">
          Good Morning, <span className="">Welcome to Weather 911 App</span>
        </p>
      );
    } else if (today.getHours() >= 11 && today.getHours() < 17) {
      return (
        <p className="">
          Good Afternoon, <span className="">Welcome to Weather 911 App</span>
        </p>
      );
    } else if (today.getHours() >= 17 && today.getHours() < 24) {
      return (
        <div className="">
          <p className="greeting">Good Evening, I'm Weather 911</p>
          <p className="greeting2">I'll give you global weather updates.</p>
        </div>
      );
    } else {
      return "What are you doing up at this hour?";
    }
  };

  return (
    <div className="app">
      <div className="group">
        <div className="confam">
          <div className="time">
            <Moment format="LT"></Moment>
          </div>
          <div className="date">
            ** <Moment format="ll"></Moment> **
          </div>
        </div>
        <p className="footer">{greeting()}</p>
      </div>
      <div className="search">
        <img src={arrow} alt="" className="arrow" />
        <div className="inputs">
          <input
            value={location}
            onChange={(event) => setLocation(event.target.value)}
            onKeyPress={searchLocation}
            placeholder="Enter any city name"
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
