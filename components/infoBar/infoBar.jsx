import { useState, useEffect } from 'react'
import classes from './infoBar.module.css'

import { useContext } from 'react'
import { SongsContext } from '../context/songsContext.js'

import useGeolocation from '../../hooks/useGeolocation/useGeolocation'

function getDate() {
  const date = new Date()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const year = date.getFullYear()
  return `${month}/${day}/${year}`
}

async function getWeather(latitude, longitude) {
  const response = await fetch('http://localhost:3000/api/getWeather', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
      },
    body: JSON.stringify({
      latitude: latitude,
      longitude: longitude
    })
  })
  const data = await response.json()
  return data
}

export default function InfoBar() {

  const { songProgress, volume } = useContext( SongsContext )

  const [date, setDate] = useState()
  const [time, setTime] = useState()
  const [weather, setWeather] = useState()
  const [hour, setHour] = useState()
  const [volumePercentage, setVolumePercentage] = useState()

  const location = useGeolocation()

  useEffect(() => {
    setDate(getDate())
    getWeather(location.coordinates.latitude, location.coordinates.longitude).then(data => {
      setWeather(data.weather[0].main)
    }).catch(error => {
      console.log(error)
    })
    setInterval(() => {
      setHour(new Date().toLocaleTimeString())
    }, 1000)
  }, [location])


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

  useEffect(() => {
    setVolumePercentage(Math.round(volume * 100))
  }, [volume])


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