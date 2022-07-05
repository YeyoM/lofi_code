import classes from './songBar.module.css'

export default function SongBar() {
  return (
    // Componente general
    <div className={classes.songBar}>

      <div className={classes.left}>
        <p>Currently Playing: Name of the song</p>
        <p className={classes.bottom}>Artist</p>
      </div>

      <div className={classes.right}>
        <p className={classes.bottom}>Buttons here</p>
      </div>

    </div>
  )
}