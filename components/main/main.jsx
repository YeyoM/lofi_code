import SongBar from "../songBar/songBar"
import Terminal from "../terminal/terminal"
import InfoBar from "../infoBar/infoBar"

import getSongs from '../songBar/utils/getSongs'
const allSongs = getSongs()

import 'terminal.css'

import classes from './main.module.css'

export default function Main() {
  return (
    <div className={classes.main} >
      <Terminal />
      <SongBar songs={allSongs}/>
      <InfoBar />
    </div>
  )
}