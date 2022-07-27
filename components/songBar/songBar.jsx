import AudioControlsCenter from './audioControlsCenter.jsx'
import AudioControlsRight from './audioControlsRight.jsx'

import { useContext } from 'react'
import { SongsContext } from '../context/songsContext.js'

import classes from './songBar.module.css'

export default function SongBar() {

  const { 
    isPlaying,
    setIsPlaying,
    toPrevSong,
    toNextSong,
    onVolumeUp,
    onVolumeDown,
    title,
    author
  } = useContext(SongsContext)

  return (
    <div className={classes.songBar}>

      <div className={classes.left}>
        <p><span className={classes.currentlyPlaying}>Currently Playing: </span>{title}</p>
        <p className={classes.bottom}><span className={classes.currentlyPlaying}>By: </span>{author || "unknown"}</p>
      </div>

      <div className={classes.center}>
        <AudioControlsCenter
          isPlaying={isPlaying}
          onPrevClick={toPrevSong}
          onNextClick={toNextSong}
          onPlayPauseClick={setIsPlaying}
        />
      </div>

      <div className={classes.right}>
        <AudioControlsRight
          onVolumeUpClick={onVolumeUp}
          onVolumeDownClick={onVolumeDown}
        />
      </div>
    </div>
  )
}