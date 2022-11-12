import SongBar from "../songBar/songBar"
import Terminal from "../terminal/terminal"
import InfoBar from "../infoBar/infoBar"
import { AnalyticsWrapper } from '../analytics'

import 'terminal.css'

import classes from './main.module.css'

export default function Main() {
  return (
    <div className={classes.main} >
      <Terminal />
      <SongBar />
      <InfoBar />
      <AnalyticsWrapper />
    </div>
  )
}