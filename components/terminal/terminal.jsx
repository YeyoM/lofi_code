import { useContext, useState, useEffect } from 'react'
import { ReactTerminal, TerminalContextProvider } from 'react-terminal'

import { SongsContext } from '../context/songsContext.js'
import { welcomeMessage } from './welcomeMessage.js'
import commands from './commands.js'

import classes from './terminal.module.css'

export default function Terminal () {
  const [appCommands, setAppCommands] = useState(null)

  const {
    isPlaying,
    setIsPlaying,
    toPrevSong,
    toNextSong,
    setVolumeCommand,
    songs,
    setAppTheme,
    appTheme
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
          setAppTheme
        }
      )
    )
  }, [setAppCommands, setVolumeCommand, toNextSong, toPrevSong, setIsPlaying, isPlaying, songs, setAppTheme])

  return (
    <TerminalContextProvider>
      <div className={classes.terminal}>
      <ReactTerminal
        theme={appTheme}
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
            themePromptColor: '#a60fa6',
            themeColor: '#ffffff'
          }
        }}
        welcomeMessage={welcomeMessage}
        prompt="lofi-terminal:~$"
        commands={appCommands}
        showControlButtons={false}
        showControlBar={false}
        errorMessage="Command not found! Type &quot;help&quot; for all available commands "
      />
      </div>
    </TerminalContextProvider>
  )
}
