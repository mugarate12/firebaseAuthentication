import { useState, useRef, useEffect } from 'react'

import Musics from './../../firebase/storage/musics'

import styles from './Player.module.css'

import api from './../../config/axios'

interface PlayerInterface {
  urlData?: string
}

export default function Player({ urlData }: PlayerInterface) {
  const musics = new Musics()
  
  const playerRef = useRef<HTMLAudioElement>(null)
  const [progressPercent, setProgressPercent] = useState<number>(0)

  useEffect(() => {
    getOnStorage()
  }, [urlData])

  async function getOnStorage() {
    if (!!urlData) {
      // await musics.get(urlData)
      //   .then(response => {
      //     let audioElement = document.getElementById('audio')
  
      //     audioElement['src'] = response.data.response['music']
      //   })

      await api.get(urlData, {
        headers: {
          'Access-Control-Allow-Origin': "*"
        }
      })
        .then(response => {
          console.log(response)
        })
        .catch(error => {
          console.log(error)
        })
    }
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