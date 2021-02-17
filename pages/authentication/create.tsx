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
import axios from './../../config/axios'

export default function CreateUserPage() {
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')

  async function createUser() {
    const fieldsNotEmpty = !!email && !!password
    
    if (fieldsNotEmpty) {
      await axios.post('/api/users/create', {
        email,
        password
      })
        .then(response => {
          console.log(response.data)
          alert('usuário criado com sucesso!')
        })
        .catch(error => {
          console.log(error.response.data)
          alert('Erro! Verifique suas informações!')
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