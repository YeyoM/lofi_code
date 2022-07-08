import { useState, useEffect } from 'react'
import classes from './infoBar.module.css'

function getDate() {
  const date = new Date()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const year = date.getFullYear()
  return `${month}/${day}/${year}`
}

export default function InfoBar() {

  const [date, setDate] = useState()
  const [time, setTime] = useState()

  useEffect(() => {
    setDate(getDate())
    setInterval(() => {
      setTime(new Date().toLocaleTimeString())
    }, 1000)
  }, [])

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
        Sunny
      </div>
    </div>  
  )
}