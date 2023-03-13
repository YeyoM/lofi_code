import React, { useState } from 'react'

import classes from './pomodoroSideBar.module.css'

export default function PomodoroSideBar () {
  const [isOpen, setIsOpen] = useState(false)

  const toggleSideBar = () => {
    setIsOpen(!isOpen)
  }

  return (
    <div className={`${classes.pomodoro} ${isOpen === true ? classes.active : ''}`} onClick={toggleSideBar}>
      <div className={classes.label}>Pomodoro Timer</div>
      <div className={classes.content}>Under Construction</div>
    </div>
  )
}
