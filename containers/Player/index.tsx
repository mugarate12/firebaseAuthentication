import { useState, useRef } from 'react'

import styles from './Player.module.css'

interface PlayerInterface {
  urlData?: string
}

export default function Player({ urlData }: PlayerInterface) {
  const playerRef = useRef<HTMLAudioElement>(null)
  const [progressPercent, setProgressPercent] = useState<number>(0)

  function handleTimeUpdate() {
    const audioPlayer = playerRef.current
    // console.log(audioPlayer.currentTime)
    const durantion = (audioPlayer.currentTime / audioPlayer.duration) * 100

    setProgressPercent(durantion)
  }
  
  return (
    <div className={styles.container}>
      <audio
        src={urlData}
        ref={playerRef}
        id='audio'
        preload='metadata'
        onTimeUpdate={handleTimeUpdate}
      />

      <progress id="file" value={progressPercent} max="100"></progress>

      <div className={styles.btnContainer}>
        <button
          onClick={() => {
            const audioPlayer = playerRef.current

            audioPlayer.play()
          }}
        >Play</button>
        <button
          onClick={() => {
            const audioPlayer = playerRef.current

            audioPlayer.pause()
          }}
        >Pause</button>
      </div>
    </div>
  );
}