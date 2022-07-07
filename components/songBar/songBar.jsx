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

  useEffect(() => {
    if (isPlaying) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying]);

  useEffect(() => {
    // Pause and clean up on unmount
    return () => {
      audioRef.current.pause();
      clearInterval(intervalRef.current);
    }
  }, []);

  useEffect(() => {
    audioRef.current.pause();
  
    audioRef.current = new Audio(path);
    setSongProgress(audioRef.current.currentTime);
  
    if (isReady.current) {
      audioRef.current.play();
      setIsPlaying(true);
      startTimer();
    } else {
      // Set the isReady ref as true for the next pass
      isReady.current = true;
    }
  }, [songIndex]);

  const startTimer = () => {
	  // Clear any timers already running
	  clearInterval(intervalRef.current);

	  intervalRef.current = setInterval(() => {
	    if (audioRef.current.ended) {
	      toNextSong();
	    } else {
	      setSongProgress(audioRef.current.currentTime);
	    }
	  }, [1000]);
	}

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