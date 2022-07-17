import React, { createContext, useState, useEffect, useRef } from "react"

import getSongs from '../songBar/utils/getSongs'
const allSongs = getSongs()

export const SongsContext = createContext()

export const SongsContextProvider = ({ children }) => {

  const [songs, setSongs] = useState([])
  const [songProgress, setSongProgress] = useState(0)
  const [volume, setVolume] = useState(0.5)
  const [songIndex, setSongIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [id, setId] = useState('')
  const [path, setPath] = useState('')
  const [audio, setAudio] = useState(typeof Audio !== "undefined" && new Audio(path))

  const audioRef = useRef(audio)
  const intervalRef = useRef()
  const isReady = useRef(false)

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetch('https://lofi-api.herokuapp.com/v1/track?limit=25')
      const json = await data.json()
      setSongs(json.items)
    }
    fetchData().catch(error => console.log(error))
  }, [])

  useEffect(() => {
    if (songs.length !== 0) {
      setTitle(songs[songIndex].title)
      setAuthor(songs[songIndex].author)
      setId(songs[songIndex].id)
      setPath(songs[songIndex].path)
      // setAudio(new Audio(songs[songIndex].path))
    }
  }, [songIndex, songs])

  useEffect(() => {
    if (isPlaying) {
      audioRef.current.play();
      audioRef.current.volume = 0.5;
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
      audioRef.current.volume = volume;
    } else {
      // Set the isReady ref as true for the next pass
      isReady.current = true;
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [songIndex, path]);

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

  const onVolumeUp = () => {
    if (audioRef.current.volume < 1) {
      audioRef.current.volume += 0.1
      setVolume(audioRef.current.volume)
    }
  }

  const onVolumeDown = () => {
    if (volume >= 0.1) {
      audioRef.current.volume -= 0.1
      setVolume(audioRef.current.volume)
    }
  }

  const setVolumeCommand = (volume) => {
    if (volume >= 0 && volume <= 1) {
      audioRef.current.volume = volume
      setVolume(volume)
    }
  }

  return (
    <SongsContext.Provider value={{
      songs,
      setSongs,
      songIndex,
      setSongIndex,
      isPlaying,
      setIsPlaying,
      toPrevSong,
      toNextSong,
      onVolumeUp,
      onVolumeDown,
      setVolumeCommand,
      title,
      author,
      id,
      path,
      songProgress,
      volume
    }}>
      {children}
    </SongsContext.Provider>
  )
}