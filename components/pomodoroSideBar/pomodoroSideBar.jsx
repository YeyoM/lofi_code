import React, { useState, useEffect } from 'react'

import classes from './pomodoroSideBar.module.css'

export default function PomodoroSideBar () {
  const pomodoroTimerTitles = ['Short Break', 'Pomodoro']
  const pomodoroTimeLenght = [300, 1500]
  const [pomodoroIterator, setPomodoroIterator] = useState(0)
  const [generalCount, setGeneralCount] = useState(0)

  const [isOpen, setIsOpen] = useState(false)
  const [pomodoroTitle, setPomodoroTitle] = useState(pomodoroTimerTitles[1])
  const [timer, setTimer] = useState('')
  const [timeRemaining, setTimeRemaining] = useState(pomodoroTimeLenght[1])
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
    if (timerStatus === true && timeRemaining > 0) {
      setTimeout(() => {
        setTimeRemaining(timeRemaining - 1)
      }, 1000)
    }
    if (timeRemaining === 0) {
      setTimerStatus(false)
    }
  }, [timeRemaining, timerStatus])

  useEffect(() => {
    if (timeRemaining === 0) {
      if (pomodoroIterator === 0) {
        setPomodoroIterator(pomodoroIterator + 1)
        setGeneralCount(generalCount + 1)
      } else if (pomodoroIterator === 1) {
        setPomodoroIterator(pomodoroIterator - 1)
        setGeneralCount(generalCount + 1)
      }
      setPomodoroTitle(pomodoroTimerTitles[pomodoroIterator])
      setTimeRemaining(pomodoroTimeLenght[pomodoroIterator])
    }
  }, [timeRemaining, pomodoroIterator, generalCount])

  const toggleTimerStatus = () => {
    if (!timerStatus) {
      setTimerStatus(true)
    } else {
      setTimerStatus(false)
    }
  }

  const toggleSideBar = () => {
    setIsOpen(!isOpen)
  }

  return (
    <div className={`${classes.pomodoro} ${isOpen === true ? classes.active : ''}`}>
      <div className={classes.label} onClick={toggleSideBar}>Toggle Pomo-Timer</div>
      <div className={classes.content}>
        <div className={classes.timerTitle}>
          {pomodoroTitle}
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
