import SongBar from "../songBar/songBar"
import Terminal from "../terminal/terminal"

import getSongs from '../songBar/utils/getSongs'
const allSongs = getSongs()

import 'terminal.css'

import classes from './main.module.css'

export default function Main() {
  return (
    <div className={classes.main} >
      <Terminal />
      <SongBar songs={allSongs}/>
    </div>
  )
}