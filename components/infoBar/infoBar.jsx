import { useState, useEffect, useContext } from 'react'
import { SongsContext } from '../context/songsContext.js'

import classes from './infoBar.module.css'

import getDate from './functions/getDate.js'
import getWeather from './functions/getWeather.js'
import infobarChangeTheme from './infobarChangeTheme.js'
import useGeolocation from '../../hooks/useGeolocation/useGeolocation'

import { Offline, Online } from 'react-detect-offline'

export default function InfoBar () {
  const {
    songProgress,
    volume,
    appTheme
  } = useContext(SongsContext)

  const location = useGeolocation()

  // States for the info bar
  const [date, setDate] = useState()
  const [time, setTime] = useState()
  const [weather, setWeather] = useState()
  const [latitude, setLatitude] = useState()
  const [longitude, setLongitude] = useState()
  const [currentProgress, setCurrentProgress] = useState()
  const [volumePercentage, setVolumePercentage] = useState()
  const [loadingWeather, setLoadingWeather] = useState(false)
  const [currentProgressStyle, setCurrentProgressStyle] = useState()

  // States for the styles (infoBar) used in the infobarChangeTheme function
  const [dateStyle, setDateStyle] = useState({})
  const [volumeStyle, setVolumeStyle] = useState({})
  const [weatherStyle, setWeatherStyle] = useState({})
  const [progressStyle, setProgressStyle] = useState({})

  /* Setting the date */
  useEffect(() => {
    setDate(getDate())
  }, [])

  /* Setting the volume percentage. */
  useEffect(() => {
    setVolumePercentage(Math.round(volume * 100))
  }, [volume])

  /* Changing the theme of the info bar. */
  useEffect(() => {
    infobarChangeTheme({ appTheme, setCurrentProgressStyle, setVolumeStyle, setProgressStyle, setWeatherStyle, setDateStyle })
  }, [appTheme])

  /* Setting and updating the time */
  useEffect(() => {
    setTime(new Date().toLocaleTimeString())
    setInterval(() => {
      setTime(new Date().toLocaleTimeString())
    }, 1000)
  }, [])

  /* Setting the weather */
  useEffect(() => {
    if (location.coordinates) {
      setLoadingWeather(true)
      setLatitude(location.coordinates.latitude)
      setLongitude(location.coordinates.longitude)
      getWeather(latitude, longitude)
        .then(data => {
          setWeather(data.weather[0].main)
          setLoadingWeather(false)
        })
        .catch(error => {
          setWeather(error.message)
          setLoadingWeather(false)
        })
    } else {
      setWeather('Climate here... Allow location services to work and refresh.')
    }
  }, [location, latitude, longitude])

  /* Setting and update the current progress */
  useEffect(() => {
    const minutes = Math.floor(songProgress / 60)
    const seconds = Math.floor(songProgress % 60)
    if (seconds < 10 && minutes < 10) {
      setCurrentProgress(`0${minutes}:0${seconds}`)
    } else if (seconds < 10 && minutes >= 10) {
      setCurrentProgress(`${minutes}:0${seconds}`)
    } else if (seconds >= 10 && minutes < 10) {
      setCurrentProgress(`0${minutes}:${seconds}`)
    } else {
      setCurrentProgress(`${minutes}:${seconds}`)
    }
  }, [songProgress])

  return (
    <div className={classes.infoBar}>
      <div className={classes.progress} style={progressStyle}>
        {currentProgress} sec
      </div>
      <div className={classes.volume} style={volumeStyle}>
        vol {volumePercentage}%
      </div>
      <div className={classes.time} style={currentProgressStyle}>
        {time}
      </div>
      <div className={classes.date} style={dateStyle}>
        {date}
      </div>
      <div className={classes.weather} style={weatherStyle}>
        <Online>
          {loadingWeather ? 'Loading...' : weather}
        </Online>
        <Offline>
          Currently Offline, reconnect to get current weather and music
        </Offline>
      </div>
    </div>
  )
}
