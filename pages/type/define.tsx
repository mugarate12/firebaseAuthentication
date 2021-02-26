import { useState } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'

import {
  Layout
} from './../../components'
import {
  GenericForm
} from './../../containers'

import styles from './Define.module.css'

import { createType } from './../../firebase/type'
import { createProfile } from './../../firebase/profile'
import { createProducer } from './../../firebase/producer'
import { user } from 'firebase-functions/lib/providers/auth'

export default function DefineType() {
  const router = useRouter()

  const [typePerfil, setTypePerfil] = useState<string>('listener')
  const [name, setName] = useState<string>('')
  const [contact, setContact] = useState<string>('')
  const [username, setUsername] = useState<string>('')

  async function defineTypeAndProfile() {
    const userUid = sessionStorage.getItem('userUID')
    const fieldsNotEmpty = !!typePerfil && !!name && !!contact && !!username

    if (fieldsNotEmpty) {
      await createType(userUid, typePerfil)
        .then(async (result) => {
          await createProfile(userUid, name, contact, username)
            .then(async (result) => {
              await createProducer(userUid)
                .then(result => {
                  if (typePerfil == 'listener') {
                    router.push(`/discover/${userUid}`)
                  } else {
                    router.push(`/producer/${userUid}`)
                  }
                })
            })
        })
        .catch(error => {
          alert(error.message)
        })
    }
  }

  return (
    <Layout>
      <Head>
        <title>Set Type</title>
      </Head>

      <div className={styles.container}>
        <select
          className={styles.select}
          name="perfil type" 
          value={typePerfil} 
          onChange={(e) => setTypePerfil(e.target.value)}
        >
          <option value="listener">Listener</option>
          <option value="producer">Producer</option>
        </select>

        <GenericForm 
          arrayOfStates={[
            {
              state: name,
              setState: setName,
              placeholder: 'name',
              type: 'text'
            },
            {
              state: contact,
              setState: setContact,
              placeholder: 'contact',
              type: 'text'
            },
            {
              state: username,
              setState: setUsername,
              placeholder: 'username',
              type: 'text'
            }
          ]}
          arrayOfButtonsInformations={[
            {
              textButton: 'Send informations',
              onClick: () => defineTypeAndProfile()
            }
          ]}
        />
      </div>
    </Layout>
  )
}