import { useState, useRef, useEffect } from 'react'

import {
  storage
} from './../../config/firebase'

import styles from './Player.module.css'

interface PlayerInterface {
  urlData?: string
}

export default function Player({ urlData }: PlayerInterface) {
  const playerRef = useRef<HTMLAudioElement>(null)
  const [progressPercent, setProgressPercent] = useState<number>(0)

  useEffect(() => {
    getOnStorage()
  }, [urlData])

  async function getOnStorage() {
    await storage.child(urlData)
      .getDownloadURL()
      .then(data => {
        console.log(data)
        // console.log(typeof data)
        // console.log(data)
        let audioElement = document.getElementById('audio')
        audioElement['src'] = data
      })
      .catch(error => {
        console.log(error)
      })
  }

  function handleTimeUpdate() {
    const audioPlayer = playerRef.current
    // console.log(audioPlayer.currentTime)
    const durantion = (audioPlayer.currentTime / audioPlayer.duration) * 100

    setProgressPercent(durantion)
  }
  
  return (
    <div className={styles.container}>
      <audio
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