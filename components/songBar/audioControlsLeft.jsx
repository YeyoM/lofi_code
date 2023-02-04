import classes from './audioControls.module.css'
import { Offline, Online } from 'react-detect-offline'

export default function AudioControlsLeft ({ title, author }) {
  return (
    <div className={classes.audioControlsLeft}>
    <Online>
          <p className={classes.currentlyPlaying}><span>Currently Playing: </span>{title}</p>
          <p className={classes.bottom}><span className={classes.currentlyPlaying}>By: </span>{author || 'unknown'}</p>
      </Online>

      <Offline>
          <p>Unable to reproduce songs</p>
      </Offline>
    </div>
  )
}
