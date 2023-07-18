import classes from './audioControls.module.css'

export default function AudioControlsLeft ({ title, author }) {
  return (
    <div className={classes.audioControlsLeft}>
      <p className={classes.currentlyPlaying}><span>Currently Playing: </span>{title}</p>
      <p className={classes.bottom}><span className={classes.currentlyPlaying}>By: </span>{author || 'unknown'}</p>
    </div>
  )
}
