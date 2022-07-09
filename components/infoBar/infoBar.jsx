import { useState, useEffect } from 'react'
import classes from './infoBar.module.css'

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

  const [date, setDate] = useState()
  const [time, setTime] = useState()
  const [weather, setWeather] = useState()

  const location = useGeolocation()

  useEffect(() => {
    setDate(getDate())
    getWeather(location.coordinates.latitude, location.coordinates.longitude).then(data => {
      setWeather(data.weather[0].main)
    }).catch(error => {
      console.log(error)
    })
    setInterval(() => {
      setTime(new Date().toLocaleTimeString())
    }, 1000)
  }, [location])

  return (
    <div className={classes.infoBar}>
      <div className={classes.general}>
        Lofi Terminal
      </div>  
      <div className={classes.time}>
        {time}
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