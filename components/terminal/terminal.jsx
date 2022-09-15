import { ReactTerminal } from 'react-terminal'
import { TerminalContextProvider } from 'react-terminal'

import { useContext, useState, useEffect } from 'react'
import { SongsContext } from '../context/songsContext.js'

import classes from './terminal.module.css'

const welcomeMessage = (<span>Welcome to the <a href="https://github.com/YeyoM/lofi_code">lofi terminal</a>, type &quot;help&quot; for all the available commands<br /></span>)

export default function Terminal() {

  const [theme, setTheme] = useState('dracula')

  useEffect(() => {
    const theme = localStorage.getItem('theme')
    document.body.style.backgroundColor = "#282a36"
    if (theme) {
      setTheme(theme)
    }
  }, [])

  const { 
    isPlaying,
    setIsPlaying,
    toPrevSong,
    toNextSong,
    setVolumeCommand,
    songs
  } = useContext(SongsContext)

  const commands = {
    svolume: (volume) => setVolumeCommand(volume),
    nextsong: () => toNextSong(),
    prevsong: () => toPrevSong(),
    playpause: () => setIsPlaying(!isPlaying),
    about: (
      <span>
        Welcome to the lofi terminal<br />
        Use it for those long coding sessions<br />
        Created by <a href="https://github.com/YeyoM">YeyoM</a><br />
        Created with <a href="https://github.com/bony2023/react-terminal">react-terminal</a>
      </span>
    ),
    help: (
      <span>
        hello                   - say hello <br/>
        svolume &lt;VOLUME&gt;  - set volume to &lt;volume&gt; <br/>
        nextsong                - play next song <br/>
        prevsong                - play previous song <br/>    
        playpause               - play or pauses the song <br/>
        about                   - get more info <br/>
        help                    - show this message <br/>    
        clear                   - clear screen  <br />
        displaySongs            - display all songs   <br />
        changeTheme             - change theme (dark, light, material-light, material-dark, material-ocean, matrix, dracula)   <br />
      </span>
    ),
    displaySongs: (
      <span>
        Current available songs: <br />
        {songs.map((song, index) => (
          <div key={index}>
            {song.title} - {song.author}
          </div>
        ))}
      </span>
    ),
    changeTheme: (theme) => {
      const validThemes = ["dark", "material-dark", "material-ocean", "matrix", "dracula"]
      if (!validThemes.includes(theme)) {
        return `Theme ${theme} not valid. Try one of ${validThemes.join(", ")}`
      }
      setTheme(theme);
      if (theme === "dark") {
        document.body.style.backgroundColor = "#002833"
      } else if (theme === "material-dark") {
        document.body.style.backgroundColor = "#151515"
      } else if (theme === "material-ocean") {
        document.body.style.backgroundColor = "#263238"
      } else if (theme === "matrix") {
        document.body.style.backgroundColor = "#110008"
      } else if (theme === "dracula") {
        document.body.style.backgroundColor = "#282a36"
      }
    }
  }

  return (
    <TerminalContextProvider>
      <div className={classes.terminal}>
      <ReactTerminal
        theme={theme}
        welcomeMessage={welcomeMessage}
        prompt="lofi-terminal:~$"
        commands={commands}
        showControlButtons={false}
        showControlBar={false}
      />
      </div>
    </TerminalContextProvider>
  )
}