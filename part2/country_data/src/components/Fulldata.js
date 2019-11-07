import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Fulldata = ({country}) => {
  const [weatherData, setWeatherData] = useState(
    {
      temperature:0,
      wind_speed:0,
      wind_dir:"N",
    })

  return (
    <div>
      {console.log('http://api.weatherstack.com/current?access_key=2bec8350f395f3b62b1d7f7474e84beb&query='+country.capital+'&units=m')}
      {useEffect(() => {
        axios
        .get('http://api.weatherstack.com/current?access_key=2bec8350f395f3b62b1d7f7474e84beb&query='+country.capital+'&units=m')
        .then(response => {
          setWeatherData(response.data.current)
        })
      }, [])}
      {console.log(weatherData)}
      {console.log("presenting full data of:", country)}
      <h1>{country.name}</h1>
      <p>
        Capital: {country.capital} <br/>
        Population: {country.population} 
      </p>
      <h3>languages</h3>
      <ul>
        {country.languages
          .map(
            language =>
              <li key={language.name}>{language.name}</li>
          )}
      </ul>
      <p>
        <img 
          src={country.flag} 
          alt="The country's flag" 
          width="300"
        />
      </p>
      <h2>Weather in {country.capital}</h2>
        <b>Temperature:</b> {weatherData.temperature} Celsius <br/>
        <img
          src={weatherData.weather_icons}
          alt="Weather icon"
          width="200"
        /><br/>
        <b>Wind:</b> {weatherData.wind_speed} kph, direction {weatherData.wind_dir} <br/>
    </div>
  )
}

export default Fulldata