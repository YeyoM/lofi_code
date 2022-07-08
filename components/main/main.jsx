import { SongsContextProvider } from "../context/songsContext"

import SongBar from "../songBar/songBar"
import Terminal from "../terminal/terminal"
import InfoBar from "../infoBar/infoBar"

import 'terminal.css'

import classes from './main.module.css'

export default function Main() {
  return (
    <SongsContextProvider>
      <div className={classes.main} >
        <Terminal />
        <SongBar />
        <InfoBar />
      </div>
    </SongsContextProvider>
  )
}