import classes from './terminal.module.css'
import { ReactTerminal } from 'react-terminal'
import { TerminalContextProvider } from 'react-terminal'

const commands = {
  hello: () => console.log("hello"),
  svolume: (volume) => console.log("volume set to " + volume),
  nextsong: () => console.log("next song"),
  prevsong: () => console.log("previous song"),
  play: () => console.log("play"),
  pause: () => console.log("pause"),
  help: (
    <span>
      hello                   - say hello <br/>
      svolume &lt;VOLUME&gt;   - set volume to &lt;volume&gt <br/>
      nextsong                - play next song <br/>
      prevsong                - play previous song <br/>    
      play                    - play song <br/>
      pause                   - pause song <br/>
      help                    - show this message <br/>    
      clear                   - clear screen      
    </span>
  )
}

export default function Terminal() {
  return (
    <TerminalContextProvider>
      <div className={classes.terminal}>
      <ReactTerminal
        theme="dracula"
        commands={commands}
        showControlButtons={false}
        showControlBar={false}
      />
      </div>
    </TerminalContextProvider>
  )
}