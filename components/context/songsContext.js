import React, { createContext, useState, useEffect, useRef } from 'react'
export const SongsContext = createContext()

export const SongsContextProvider = ({ children }) => {
  // General state for the songs
  const [songs, setSongs] = useState([])

  // State for the current song array index
  const [songIndex, setSongIndex] = useState(0)

  // State for the current song properties
  const [isPlaying, setIsPlaying] = useState(false)
  const [songProgress, setSongProgress] = useState(0)
  const [volume, setVolume] = useState(0.5)

  // State for the current song information
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [path, setPath] = useState('')
  const [id, setId] = useState('')

  // Ref for the current song's audio element
  const audioRef = useRef(typeof Audio !== 'undefined' && new Audio(path))
  const intervalRef = useRef()
  const isReady = useRef(false)

  // check if is the first time the app is loaded
  const isFirstRun = useRef(true)

  const [appTheme, setAppTheme] = useState('')

  // Set the current song's information state
  useEffect(() => {
    if (songs.length !== 0) {
      setTitle(songs[songIndex].title)
      setAuthor(songs[songIndex].author)
      setPath(songs[songIndex].path)
      setId(songs[songIndex].id)
    }
  }, [songIndex, songs])

  useEffect(() => {
    const localTheme = localStorage.getItem('theme')
    setAppTheme(localStorage.getItem('theme'))
    if (!localTheme) {
      localStorage.setItem('theme', 'matrix')
      setAppTheme('matrix')
      document.body.style.backgroundColor = '#110008'
    } else {
      setAppTheme(localTheme)
      if (localTheme === 'dark') {
        document.body.style.backgroundColor = '#002833'
      } else if (localTheme === 'materialDark') {
        document.body.style.backgroundColor = '#151515'
      } else if (localTheme === 'materialOcean') {
        document.body.style.backgroundColor = '#263238'
      } else if (localTheme === 'matrix') {
        document.body.style.backgroundColor = '#110008'
      } else if (localTheme === 'dracula') {
        document.body.style.backgroundColor = '#282a36'
      } else if (localTheme === 'gruvbox') {
        document.body.style.backgroundColor = '#292828'
      }
    }
  }, [setAppTheme])

  // Play the current song in case isPlaying is true
  useEffect(() => {
    if (isPlaying) {
      audioRef.current.play()
    } else {
      audioRef.current.pause()
    }
  }, [isPlaying])

  /* A cleanup function that is called when the component is unmounted. */
  useEffect(() => {
    return () => {
      audioRef.current.pause()
      clearInterval(intervalRef.current)
    }
  }, [])

  /* Creating a new Audio element and setting the current time to the songProgress state. */
  useEffect(() => {
    audioRef.current.pause()
    audioRef.current = new Audio(path)

    setSongProgress(audioRef.current.currentTime)

    if (isReady.current) {
      // check if is the first time the app is loaded
      // to set the isPlaying state to false
      if (isFirstRun.current) {
        isFirstRun.current = false
        setIsPlaying(false)
        audioRef.current.pause()
      } else {
        if (isPlaying) {
          setIsPlaying(true)
          audioRef.current.play()
        } else {
          setIsPlaying(false)
        }
      }
      startTimer()
      audioRef.current.volume = volume
    } else {
      isReady.current = true
    }
  }, [songIndex, path])

  const clickPlayBtn = () => {
    setIsPlaying(!isPlaying)
  }

  /* Setting the current time of the song to the songProgress state. */
  const startTimer = () => {
    clearInterval(intervalRef.current)
    intervalRef.current = setInterval(() => {
      if (audioRef.current.ended) {
        toNextSong()
      } else {
        setSongProgress(audioRef.current.currentTime)
      }
    }, [1000])
  }

  /* Functions to control the current song list and current song properties */
  const toPrevSong = () => {
    if (songIndex - 1 < 0) {
      setSongIndex(songs.length - 1)
    } else {
      setSongIndex(songIndex - 1)
    }
  }

  const toNextSong = () => {
    if (songIndex < songs.length - 1) {
      setSongIndex(songIndex + 1)
    } else {
      setSongIndex(0)
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
      clickPlayBtn,
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
      volume,
      appTheme,
      setAppTheme
    }}>
      { children }
    </SongsContext.Provider>
  )
}
