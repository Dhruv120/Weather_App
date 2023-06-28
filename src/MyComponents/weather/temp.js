import React,{useState,useEffect} from 'react'
import './style.css'
import Weathercard from './weathercard';


const Temp = () => {

  const [searchValue, setsearchValue] = useState("Surat");
  const [tempInfo, settempInfo] = useState({});

  const getWeatherInfo = async () =>{
      try {
        let url = `https://api.openweathermap.org/data/2.5/weather?q=${searchValue}&units=metric&appid=3bcbe12fb7769da668dd75513d3d5437`;

        const res = await fetch(url);
        const data = await res.json();
        console.log(data)

        const {temp,humidity,pressure} = data.main;
        const {main:weathermood} = data.weather[0];
        const{name} = data;
        const {speed} = data.wind;
        const {country,sunset} = data.sys;
        

        const mynewWeatherInfo = {temp,humidity,pressure,weathermood,name,speed,country,sunset,};
        settempInfo(mynewWeatherInfo);

      } catch (error) {
        console.log(error);
      }
  }

  useEffect(() => {
    getWeatherInfo();
  }, [])

  return (
    <div>
      <div className="wrap">
        <div className="search">
          <input
            type="search"
            placeholder="Search...."
            autoFocus
            id="search"
            className="searchTerm"
            value={searchValue}
            onChange={(e)=>setsearchValue(e.target.value)}
          />
          <button className="searchButton" type="button" onClick={getWeatherInfo}>
            Search
          </button>
        </div>
      </div>

      <Weathercard tempinfo={tempInfo}/>
    </div>
  );
}

export default Temp