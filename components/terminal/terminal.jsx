import { ReactTerminal } from 'react-terminal'
import { TerminalContextProvider } from 'react-terminal'

import { useContext, useState, useEffect } from 'react'
import { SongsContext } from '../context/songsContext.js'

import classes from './terminal.module.css'

const welcomeMessage = (<span>Welcome to the <a href="https://github.com/YeyoM/lofi_code">lofi terminal</a>, type &quot;help&quot; for all the available commands<br /></span>)

export default function Terminal() {

  const [theme, setTheme] = useState('matrix')

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
    const theme = localStorage.getItem('theme')
    console.log(theme)
    if (!theme) {
      localStorage.setItem('theme', 'matrix')
      setAppTheme('matrix')
      setTheme('matrix')
      document.body.style.backgroundColor = "#110008"
    } else {
      setAppTheme(theme)
      setTheme(theme)
      if (theme === "dark") {
        document.body.style.backgroundColor = "#002833"
      } else if (theme === "materialDark") {
        document.body.style.backgroundColor = "#151515"
      } else if (theme === "materialOcean") {
        document.body.style.backgroundColor = "#263238"
      } else if (theme === "matrix") {
        document.body.style.backgroundColor = "#110008"
      } else if (theme === "dracula") {
        document.body.style.backgroundColor = "#282a36"
      } else if (theme === "gruvbox") {
        document.body.style.backgroundColor = "#292828"
      }
    }

  }, [setAppTheme])

  const commands = {
    svolume: (volume) => setVolumeCommand(volume / 100),
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
        svolume &lt;VOLUME&gt;  - set volume to &lt;volume&gt; (0-100)<br/>
        nextsong                - play next song <br/>
        prevsong                - play previous song <br/>    
        playpause               - play or pauses the song <br/>
        about                   - get more info <br/>
        help                    - show this message <br/>    
        clear                   - clear screen  <br />
        displaySongs            - display all songs   <br />
        changeTheme             - change theme (dark, materialDark, materialOcean, matrix, dracula)
      </span>
    ),
    displaySongs: (
      <span>
        Current available songs: <br />
        {songs.map((song, index) => (
          <div key={index}>
            <a href={song.path}>{song.title}</a> - {song.author}
          </div>
        ))}
      </span>
    ),
    changeTheme: (theme) => {
      const validThemes = ["dark", "materialDark", "materialOcean", "matrix", "dracula", "gruvbox"]
      if (!validThemes.includes(theme)) {
        return `Theme ${theme} not valid. Try one of ${validThemes.join(", ")}`
      }
      setTheme(theme);
      if (theme === "dark") {
        document.body.style.backgroundColor = "#002833"
        setAppTheme("dark")
        setTheme("dark")
        localStorage.setItem('theme', 'dark')
        // cambiar los colores de cada infobar para que luego se apliquen a la app
      } else if (theme === "materialDark") {
        document.body.style.backgroundColor = "#151515"
        setAppTheme("materialDark")
        setTheme("materialDark")
        localStorage.setItem('theme', 'materialDark')
      } else if (theme === "materialOcean") {
        document.body.style.backgroundColor = "#263238"
        setAppTheme("materialOcean")
        setTheme("materialOcean")
        localStorage.setItem('theme', 'materialOcean')
      } else if (theme === "matrix") {
        document.body.style.backgroundColor = "#110008"
        setAppTheme("matrix")
        setTheme("matrix")
        localStorage.setItem('theme', 'matrix')
      } else if (theme === "dracula") {
        document.body.style.backgroundColor = "#282a36"
        setAppTheme("dracula")
        setTheme("dracula")
        localStorage.setItem('theme', 'dracula')
      } else if (theme === "gruvbox") {
        document.body.style.backgroundColor = "#292828"
        setAppTheme("gruvbox")
        setTheme("gruvbox")
        localStorage.setItem('theme', 'gruvbox')
      }
    }
  }

  return (
    <TerminalContextProvider>
      <div className={classes.terminal}>
      <ReactTerminal
        theme={theme}
        themes={{
          gruvbox: {
            themeBGColor: "#66000000",
            themePromptColor: "#d1801d",
            themeColor: "#FFFEFC",
          },
          dark: {
            themeBGColor: "#66000000",
            themePromptColor: "#b9d82c",
            themeColor: "#ffffff",
          }, 
          materialDark: {
            themeBGColor: "#66000000",
            themePromptColor: "#3895e7",
            themeColor: "#ffffff",
          },
          materialOcean: {
            themeBGColor: "#66000000",
            themePromptColor: "#b9d82c",
            themeColor: "#ffffff",
          },
          matrix: {
            themeBGColor: "#66000000",
            themePromptColor: "#00FF00",
            themeColor: "#00FF00",
          },
          dracula: {
            themeBGColor: "#66000000",
            themePromptColor: "#a60fa6", // morado
            themeColor: "#ffffff", // blanco
          }
        }}
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
