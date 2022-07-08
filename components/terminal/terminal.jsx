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
      play                    - play song <br/>
      pause                   - pause song <br/>
      about                   - get more info <br/>
      help                    - show this message <br/>    
      clear                   - clear screen      
    </span>
  )
}

const welcomeMessage = (<span>Welcome to the <a href="https://github.com/YeyoM/lofi_code">lofi terminal</a>, type &quot;help&quot; for all the available commands<br /></span>)

export default function Terminal() {
  return (
    <TerminalContextProvider>
      <div className={classes.terminal}>
      <ReactTerminal
        theme="dracula"
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