import PlayBtn from './assets/playBtn.svg';
import PauseBtn from './assets/pauseBtn.svg';
import NextBtn from './assets/nextBtn.svg';
import PrevBtn from './assets/prevBtn.svg';

import classes from './audioControls.module.css';

export default function audioControls({ isPlaying, onPlayPauseClick, onPrevClick, onNextClick }) {
  return (
    <div className={classes.audioControls}>
    <button
      type="button"
      className={classes.prev}
      aria-label="Previous"
      onClick={onPrevClick}
    >
      <PrevBtn />
    </button>
    {isPlaying ? (
      <button
        type="button"
        className={classes.pause}
        onClick={() => onPlayPauseClick(false)}
        aria-label="Pause"
      >
        <PauseBtn />
      </button>
    ) : (
      <button
        type="button"
        className={classes.play}
        onClick={() => onPlayPauseClick(true)}
        aria-label="Play"
      >
        <PlayBtn />
      </button>
    )}
    <button
      type="button"
      className={classes.next}
      aria-label="Next"
      onClick={onNextClick}
    >
      <NextBtn />
    </button>
  </div>
  )
}