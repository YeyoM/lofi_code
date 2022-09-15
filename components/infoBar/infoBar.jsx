import { useState, useEffect } from 'react'
import classes from './infoBar.module.css'

import { useContext } from 'react'
import { SongsContext } from '../context/songsContext.js'

import getWeather from './functions/getWeather.js'
import getDate from './functions/getDate.js'

import useGeolocation from '../../hooks/useGeolocation/useGeolocation'

export default function InfoBar() {

  const { 
    songProgress, 
    volume,
    infoBarColors
  } = useContext( SongsContext )

  const [date, setDate] = useState()
  const [time, setTime] = useState()
  const [latitude, setLatitude] = useState()
  const [longitude, setLongitude] = useState()
  const [weather, setWeather] = useState()
  const [hour, setHour] = useState()
  const [volumePercentage, setVolumePercentage] = useState()

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
        console.log(error)
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
  }, [infoBarColors])

  return (
    <div className={classes.infoBar}>
      <div className={classes.general}>
        Lofi Terminal
      </div>  
      <div className={classes.progress}>
        {time} sec
      </div>
      <div className={classes.volume}>
        vol {volumePercentage}%
      </div>
      <div className={classes.time}>
        {hour}
      </div>
      <div className={classes.date}>
        {date}
      </div>
      <div className={classes.weather}>
        {weather}
      </div>
    </div>  
  )
}