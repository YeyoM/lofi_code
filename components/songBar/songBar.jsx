import AudioControls from './AudioControls'

import { useState, useEffect, useRef } from 'react'

import classes from './songBar.module.css'

export default function SongBar({ songs }) {

  const [songIndex, setSongIndex] = useState(0)
  const [songProgress, setSongProgress] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)

  const { title, author, id, path } = songs[songIndex]

  const [audio] = useState(typeof Audio !== "undefined" && new Audio(URL))
  const audioRef = useRef(audio)
  const intervalRef = useRef()
  const isReady = useRef(false)

  const { duration } = audioRef.current

  const toPrevSong = () => {
    if (songIndex - 1 < 0) {
      setSongIndex(songs.length - 1);
    } else {
      setSongIndex(songIndex - 1);
    }
  }

  const toNextSong = () => {
    if (songIndex < songs.length - 1) {
      setSongIndex(songIndex + 1);
    } else {
      setSongIndex(0);
    }
  }

  return (
    // Componente general
    <div className={classes.songBar}>

      <div className={classes.left}>
        <p>Currently Playing: {title}</p>
        <p className={classes.bottom}>By: {author || "unknown"}</p>
      </div>

      <div className={classes.right}>
        <AudioControls
            isPlaying={isPlaying}
            onPrevClick={toPrevSong}
            onNextClick={toNextSong}
            onPlayPauseClick={setIsPlaying}
        />
      </div>

    </div>
  )
}