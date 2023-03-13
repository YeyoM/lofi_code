import SongBar from '../songBar/songBar'
import Terminal from '../terminal/terminal'
import InfoBar from '../infoBar/infoBar'
import PomodoroSideBar from '../pomodoroSideBar/pomodoroSideBar'
import { AnalyticsWrapper } from '../analytics'

import 'terminal.css'

import classes from './main.module.css'

export default function Main () {
  return (
    <div className={classes.main} >
      <Terminal />
      <PomodoroSideBar />
      <SongBar />
      <InfoBar />
      <AnalyticsWrapper />
    </div>
  )
}
