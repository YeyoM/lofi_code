import React, { useState, useEffect } from 'react'

import classes from './pomodoroSideBar.module.css'

export default function PomodoroSideBar () {
  const pomodoroTimerTitles = ['Pomodoro', 'Short Break', 'Long Break']
  const pomodoroTimeLenght = [1500, 300, 900]
  const pomodoroIterator = 0

  const [isOpen, setIsOpen] = useState(false)
  const [timer, setTimer] = useState('')
  const [timeRemaining, setTimeRemaining] = useState(pomodoroTimeLenght[0])
  const [timerStatus, setTimerStatus] = useState(false)

  useEffect(() => {
    const minutes = Math.floor(timeRemaining / 60)
    const seconds = Math.floor(timeRemaining % 60)
    if (seconds < 10 && minutes < 10) {
      setTimer(`0${minutes}:0${seconds}`)
    } else if (seconds < 10 && minutes >= 10) {
      setTimer(`${minutes}:0${seconds}`)
    } else if (seconds >= 10 && minutes < 10) {
      setTimer(`0${minutes}:${seconds}`)
    } else {
      setTimer(`${minutes}:${seconds}`)
    }
  }, [timeRemaining])

  // useEffect to track pomodoro countdown
  useEffect(() => {
    if (timerStatus === true) {
      setTimeout(() => {
        setTimeRemaining(timeRemaining - 1)
      }, 1000)
    }
  }, [timeRemaining, timerStatus])

  const toggleTimerStatus = () => {
    if (!timerStatus) {
      setTimerStatus(true)
    } else {
      setTimerStatus(false)
    }
    console.log(timerStatus)
  }

  const toggleSideBar = () => {
    setIsOpen(!isOpen)
  }

  return (
    <div className={`${classes.pomodoro} ${isOpen === true ? classes.active : ''}`}>
      <div className={classes.label} onClick={toggleSideBar}>Toggle Pomo-Timer</div>
      <div className={classes.content}>
        <div className={classes.timerTitle}>
          {pomodoroTimerTitles[pomodoroIterator]}
        </div>
        <div className={classes.timer}>
          {timer}
        </div>
        <button className={classes.start} onClick={toggleTimerStatus}>
          {
            timerStatus
              ? 'Stop'
              : 'Start'
          }
        </button>
      </div>
    </div>
  )
}
