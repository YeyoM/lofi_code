import { useState, useEffect } from 'react'
import classes from './infoBar.module.css'

import { useContext } from 'react'
import { SongsContext } from '../context/songsContext.js'

import getWeather from './functions/getWeather.js'
import getDate from './functions/getDate.js'

import useGeolocation from '../../hooks/useGeolocation/useGeolocation'

import { Offline, Online } from "react-detect-offline"

export default function InfoBar() {

  const { 
    songProgress, 
    volume,
    appTheme
  } = useContext( SongsContext )

  const [date, setDate] = useState()
  const [time, setTime] = useState()
  const [latitude, setLatitude] = useState()
  const [longitude, setLongitude] = useState()
  const [weather, setWeather] = useState()
  const [hour, setHour] = useState()
  const [volumePercentage, setVolumePercentage] = useState()
  const [generalStyle, setGeneralStyle] = useState({})
  const [timeStyle, setTimeStyle] = useState({})
  const [volumeStyle, setVolumeStyle] = useState({})
  const [progressStyle, setProgressStyle] = useState({})
  const [weatherStyle, setWeatherStyle] = useState({})
  const [dateStyle, setDateStyle] = useState({})


  const location = useGeolocation()


  /* Setting the date, weather, and time. */
  useEffect(() => {
    setDate(getDate())
    if (location.coordinates) {
      setLatitude(location.coordinates.latitude)
      setLongitude(location.coordinates.longitude)
      getWeather(latitude, longitude).then(data => {
        setWeather(data.weather[0].main)
      }).catch(error => {
      })
    } else {
      setWeather('Climate here... Allow location services to work and refresh.')
    }
    setInterval(() => {
      setHour(new Date().toLocaleTimeString())
    }, 1000)
  }, [location, latitude, longitude])

  /* Setting the time. */
  useEffect(() => {
    const minutes = Math.floor(songProgress / 60)
    const seconds = Math.floor(songProgress % 60)
    if (seconds < 10 && minutes < 10) {
      setTime(`0${minutes}:0${seconds}`)
    } else if (seconds < 10 && minutes >= 10) {
      setTime(`${minutes}:0${seconds}`)
    } else if (seconds >= 10 && minutes < 10) {
      setTime(`0${minutes}:${seconds}`)
    } else {
      setTime(`${minutes}:${seconds}`)
    }
  }, [songProgress])

  /* Setting the volume percentage. */
  useEffect(() => {
    setVolumePercentage(Math.round(volume * 100))
  }, [volume])

  useEffect(() => {
    // change the inline styles for the infobar bgcolors
    if (appTheme === "dracula") {
      setGeneralStyle({backgroundColor: "#6b126b"})
      setProgressStyle({backgroundColor: "#7e2a7e"})
      setVolumeStyle({backgroundColor: "#a60fa6"})
      setTimeStyle({backgroundColor: "#192c95"})
      setDateStyle({backgroundColor: "#3b4a9d"})
      setWeatherStyle({backgroundColor: "#505a90"})
    } else if (appTheme === "dark") {
      setGeneralStyle({backgroundColor: "#6c7d47"})
      setProgressStyle({backgroundColor: "#3f492a"})
      setVolumeStyle({backgroundColor: "#323a21"})
      setTimeStyle({backgroundColor: "#69a2b0"})
      setDateStyle({backgroundColor: "#4a737d"})
      setWeatherStyle({backgroundColor: "#2b4449"})
    } else if (appTheme === "materialDark") {
      setGeneralStyle({backgroundColor: "#586ba4"})
      setProgressStyle({backgroundColor: "#3c4971"})
      setVolumeStyle({backgroundColor: "#20283d"})
      setTimeStyle({backgroundColor: "#ff4f51"})
      setDateStyle({backgroundColor: "#cc3f40"})
      setWeatherStyle({backgroundColor: "#992f30"})
    } else if (appTheme === "materialOcean") {
      setGeneralStyle({backgroundColor: "#4d9de0"})
      setProgressStyle({backgroundColor: "#3b79ad"})
      setVolumeStyle({backgroundColor: "#29557a"})
      setTimeStyle({backgroundColor: "#6da34d"})
      setDateStyle({backgroundColor: "#4a6f34"})
      setWeatherStyle({backgroundColor: "#283c1c"})
    } else if (appTheme === "gruvbox") {
      setGeneralStyle({backgroundColor: "#d2453b"})
      setProgressStyle({backgroundColor: "#9f342c"})
      setVolumeStyle({backgroundColor: "#6c231d"})
      setTimeStyle({backgroundColor: "#fc924d"})
      setDateStyle({backgroundColor: "#c9743d"})
      setWeatherStyle({backgroundColor: "#95562d"})
    } else if (appTheme === "matrix") {
      setGeneralStyle({backgroundColor: "#00ff00"})
      setProgressStyle({backgroundColor: "#00cc00"})
      setVolumeStyle({backgroundColor: "#009900"})
      setTimeStyle({backgroundColor: "#0000ff"})
      setDateStyle({backgroundColor: "#0000cc"})
      setWeatherStyle({backgroundColor: "#000099"})
    }
  }, [appTheme])

  return (
    <div className={classes.infoBar}>
       
      <div className={classes.progress} style={progressStyle}>
        {time} sec
      </div>
      <div className={classes.volume} style={volumeStyle}>
        vol {volumePercentage}%
      </div>
      <div className={classes.time} style={timeStyle}>
        {hour}
      </div>
      <div className={classes.date} style={dateStyle}>
        {date}
      </div>
      <div className={classes.weather} style={weatherStyle}>
        <Online>
          Current weather: {weather}
        </Online>
        <Offline>
          Currently Offline, reconnect to get current weather and music
        </Offline>
      </div>
    </div>  
  )
}
