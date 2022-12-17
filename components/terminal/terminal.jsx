import { useContext, useState, useEffect } from 'react'
import { ReactTerminal, TerminalContextProvider } from 'react-terminal'

import { SongsContext } from '../context/songsContext.js'
import commands from './commands.js'
import { welcomeMessage } from './welcomeMessage.js'
import classes from './terminal.module.css'

export default function Terminal () {
  const [theme, setTheme] = useState('matrix')
  const [appCommands, setAppCommands] = useState(null)

  const {
    isPlaying,
    setIsPlaying,
    toPrevSong,
    toNextSong,
    setVolumeCommand,
    songs,
    setAppTheme
  } = useContext(SongsContext)

  useEffect(() => {
    setAppCommands(
      commands(
        {
          setVolumeCommand,
          toNextSong,
          toPrevSong,
          setIsPlaying,
          isPlaying,
          songs,
          setTheme,
          setAppTheme
        }
      )
    )
  }, [setAppCommands, setVolumeCommand, toNextSong, toPrevSong, setIsPlaying, isPlaying, songs, setAppTheme])

  useEffect(() => {
    setTheme(localStorage.getItem('theme'))
    if (!theme) {
      localStorage.setItem('theme', 'matrix')
      setAppTheme('matrix')
      setTheme('matrix')
      document.body.style.backgroundColor = '#110008'
    } else {
      setAppTheme(theme)
      setTheme(theme)
      if (theme === 'dark') {
        document.body.style.backgroundColor = '#002833'
      } else if (theme === 'materialDark') {
        document.body.style.backgroundColor = '#151515'
      } else if (theme === 'materialOcean') {
        document.body.style.backgroundColor = '#263238'
      } else if (theme === 'matrix') {
        document.body.style.backgroundColor = '#110008'
      } else if (theme === 'dracula') {
        document.body.style.backgroundColor = '#282a36'
      } else if (theme === 'gruvbox') {
        document.body.style.backgroundColor = '#292828'
      }
    }
  }, [setAppTheme])

  return (
    <TerminalContextProvider>
      <div className={classes.terminal}>
      <ReactTerminal
        theme={theme}
        themes={{
          gruvbox: {
            themeBGColor: '#66000000',
            themePromptColor: '#d1801d',
            themeColor: '#FFFEFC'
          },
          dark: {
            themeBGColor: '#66000000',
            themePromptColor: '#b9d82c',
            themeColor: '#ffffff'
          },
          materialDark: {
            themeBGColor: '#66000000',
            themePromptColor: '#3895e7',
            themeColor: '#ffffff'
          },
          materialOcean: {
            themeBGColor: '#66000000',
            themePromptColor: '#b9d82c',
            themeColor: '#ffffff'
          },
          matrix: {
            themeBGColor: '#66000000',
            themePromptColor: '#00FF00',
            themeColor: '#00FF00'
          },
          dracula: {
            themeBGColor: '#66000000',
            themePromptColor: '#a60fa6', // morado
            themeColor: '#ffffff' // blanco
          }
        }}
        welcomeMessage={welcomeMessage}
        prompt="lofi-terminal:~$"
        commands={appCommands}
        showControlButtons={false}
        showControlBar={false}
      />
      </div>
    </TerminalContextProvider>
  )
}
