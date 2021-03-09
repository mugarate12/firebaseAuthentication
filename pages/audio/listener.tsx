import { useState, ChangeEvent } from 'react'

import Musics from './../../firebase/storage/musics'

import {
  Player
} from './../../containers'

import styles from './Listener.module.css'

import api from './../../config/axios'

import { database, storage } from './../../config/firebase'

interface PlaylistInterface {
  musicName: string,
  storageReference: string
}

export default function Listener() {
  const musics = new Musics()

  const [MusicFile, setMusicFile] = useState<File>(null)
  const [Playlist, setPlaylist] = useState<Array<PlaylistInterface>>([])
  const [playerActualMusic, setPlayerActualMusic] = useState<string>('')

  function handleFile(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files[0]

    setMusicFile(file)
  }

  async function sendMusic() {
    await musics.upload(MusicFile)
      .then(response => {
        alert(response.data.sucess)
      })
      .catch(error => {
        console.error(error)
      })
  }

  async function listMusics() {
    await musics.index()
      .then(response => {
        setPlaylist(response.data.response['musics'])
      })
      .catch(error => {
        console.error(error)
      })
  }

  function renderMusics() {
    return Playlist.map((music, index) => {
      return (
        <button
          key={String(index)}
          onClick={() => {
            setPlayerActualMusic(music.storageReference)
          }}
        >{music.musicName}</button>
      )
    })
  }

  return (
    <div className={styles.container}>
      <input type='file'
        onChange={(e) => handleFile(e)}
      />
      
      <button
        onClick={() => sendMusic()}
      >
        send to google cloud storage
      </button>

      <button
        onClick={() => listMusics()}
      >
        get musics referente in firestore
      </button>

      <p>Musics:</p>

      {renderMusics()}

      <Player 
        urlData={playerActualMusic}
      />
    </div>
  );
}