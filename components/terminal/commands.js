export default function commands (props) {
  const allCommands = {
    svolume: (volume) => props.setVolumeCommand(volume / 100),
    nextsong: () => props.toNextSong(),
    prevsong: () => props.toPrevSong(),
    playpause: () => props.setIsPlaying(!props.isPlaying),
    about: (
      <span>
        Welcome to the lofi terminal<br />
        Use it for those long coding and study sessions<br />
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
        contribute              - contribute to the project and share your ideas<br/>
        clear                   - clear screen  <br />
        displaySongs            - display all songs   <br />
        changeTheme             - change theme (dark, materialDark, materialOcean, matrix, dracula)
      </span>
    ),
    contribute: (
      <span>
        Contribute <a href="https://github.com/YeyoM/lofi_code">here</a> to the project.<br/>
        Share your thoughts, request new features or report bugs.<br/>
        We want to hear you to make this project better.
      </span>

    ),
    displaySongs: (
      <span>
        Current available songs: <br />
        {props.songs.map((song, index) => (
          <div key={index}>
            <a href={song.path}>{song.title}</a> - {song.author}
          </div>
        ))}
      </span>
    ),
    changeTheme: (theme) => {
      const validThemes = ['dark', 'materialDark', 'materialOcean', 'matrix', 'dracula', 'gruvbox']
      if (!validThemes.includes(theme)) {
        return `Theme ${theme} not valid. Try one of ${validThemes.join(', ')}`
      }
      props.setAppTheme(theme)
      if (theme === 'dark') {
        document.body.style.backgroundColor = '#002833'
        props.setAppTheme('dark')
        localStorage.setItem('theme', 'dark')
        // cambiar los colores de cada infobar para que luego se apliquen a la app
      } else if (theme === 'materialDark') {
        document.body.style.backgroundColor = '#151515'
        props.setAppTheme('materialDark')
        localStorage.setItem('theme', 'materialDark')
      } else if (theme === 'materialOcean') {
        document.body.style.backgroundColor = '#263238'
        props.setAppTheme('materialOcean')
        localStorage.setItem('theme', 'materialOcean')
      } else if (theme === 'matrix') {
        document.body.style.backgroundColor = '#110008'
        props.setAppTheme('matrix')
        localStorage.setItem('theme', 'matrix')
      } else if (theme === 'dracula') {
        document.body.style.backgroundColor = '#282a36'
        props.setAppTheme('dracula')
        localStorage.setItem('theme', 'dracula')
      } else if (theme === 'gruvbox') {
        document.body.style.backgroundColor = '#292828'
        props.setAppTheme('gruvbox')
        localStorage.setItem('theme', 'gruvbox')
      }
    }
  }

  return allCommands
}
