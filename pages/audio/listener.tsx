import { useState, ChangeEvent } from 'react'

import Musics from './../../firebase/storage/musics'

import {
  Player
} from './../../containers'

import styles from './Listener.module.css'

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

  async function sendSong() {
    if (!!MusicFile) {
      await musics.upload(MusicFile.name, MusicFile)
        .then(snapshot => {
          alert('música enviada')
        })
    }
  }

  async function listMusics() {
    await musics.index()
      .then(response => {
        let playlistArray: Array<PlaylistInterface> = []

        response.data.response['items'].forEach(music => {
          playlistArray.push({
            musicName: music.name,
            storageReference: music.fullPath
          })
        })

        setPlaylist(playlistArray)
      })
      .catch(error => {
        console.log(error)
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
        onClick={() => sendSong()}
      >
        Send Song
      </button>

      <button
        onClick={() => listMusics()}
      >
        List All Music
      </button>

      <p>Musics:</p>

      {renderMusics()}

      <Player 
        urlData={playerActualMusic}
      />
    </div>
  );
}