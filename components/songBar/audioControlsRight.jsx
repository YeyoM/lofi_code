import VolumeUpBtn from './assets/volumeUpBtn.svg'
import VolumeDownBtn from './assets/volumeDownBtn.svg'

import classes from './audioControls.module.css'

export default function audioControlsRight({ onVolumeUpClick, onVolumeDownClick }) {
  return (
    <div className={classes.audioControlsRight}>
      <button
        type="button"
        className={classes.volumeDown}
        aria-label="Volume Down"
        onClick={onVolumeDownClick}
      >
        <VolumeDownBtn />
      </button>
      <button
        type="button"
        className={classes.volumeUp}
        aria-label="Volume Up"
        onClick={onVolumeUpClick}
      >
        <VolumeUpBtn />
      </button>
    </div>
  )
}