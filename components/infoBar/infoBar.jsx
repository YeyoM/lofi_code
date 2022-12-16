import { SongsContext } from '../context/songsContext.js'
import { useState, useEffect } from 'react'
import { useContext } from 'react'

import infobarChangeTheme from './infobarChangeTheme.js'
import classes from './infoBar.module.css'

import getWeather from './functions/getWeather.js'
import getDate from './functions/getDate.js'
import useGeolocation from '../../hooks/useGeolocation/useGeolocation'

import { Offline, Online } from 'react-detect-offline'

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
    infobarChangeTheme(appTheme, setGeneralStyle, setTimeStyle, setVolumeStyle, setProgressStyle, setWeatherStyle, setDateStyle)
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
