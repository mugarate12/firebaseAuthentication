import { useState } from 'react'
import Head from 'next/head'

import {
  Layout
} from './../../components'
import {
  GenericForm
} from './../../containers'

import styles from './Create.module.css'

import firebase from './../../config/firebase'

export default function CreateUserPage() {
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')

  async function createUser() {
    const fieldsNotEmpty = !!email && !!password
    
    if (fieldsNotEmpty) {

      await fetch('http://localhost:3000/api/users/create', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify({ 
          email,
          password
        })
      })
        .then(async (response) => {
          const data = await response.json()

          console.log(data)
          alert('usuário criado com sucesso!')
        })
        .catch(error => {
          console.log(error)
          alert('error')
        })
    } else {
      alert('preencha os campos!')
    }
  }

  return (
    <Layout>
      <Head>
        <title>Criar usuário</title>
      </Head>

      <div className={styles.container}>
        <GenericForm 
          arrayOfStates={[
            {
              state: email,
              setState: setEmail,
              type: 'text'
            },
            {
              state: password,
              setState: setPassword,
              type: 'password'
            }
          ]}
          textButton='Criar usuário'
          onClick={() => createUser()}
        />
      </div>
    </Layout>
  )
}