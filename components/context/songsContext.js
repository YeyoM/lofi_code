import React, { createContext, useState, useEffect, useRef } from "react"

import getSongs from '../songBar/utils/getSongs'
const allSongs = getSongs()

export const SongsContext = createContext()

export const SongsContextProvider = ({ children }) => {

  const [songs, setSongs] = useState(allSongs)
  const [songIndex, setSongIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)

  const { title, author, id, path } = songs[songIndex]

  const [audio] = useState(typeof Audio !== "undefined" && new Audio(path))
  const audioRef = useRef(audio)
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
    }
  }, []);

  useEffect(() => {
    audioRef.current.pause();
  
    audioRef.current = new Audio(path);
  
    if (isReady.current) {
      audioRef.current.play();
      setIsPlaying(true);
    } else {
      // Set the isReady ref as true for the next pass
      isReady.current = true;
    }
  }, [songIndex, path]);

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
    }
  }

  const onVolumeDown = () => {
    if (audioRef.current.volume >= 0.1) {
      audioRef.current.volume -= 0.1
    }
  }

  const setVolume = (volume) => {
    if (volume >= 0 && volume <= 1) {
      audioRef.current.volume = volume
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
      setVolume,
      title,
      author,
      id,
      path
    }}>
      {children}
    </SongsContext.Provider>
  )
}