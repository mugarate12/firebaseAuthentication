import { useState } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'

import {
  Layout
} from './../../components'
import {
  GenericForm
} from './../../containers'

import styles from './Create.module.css'

import firebase, { Firebase } from './../../config/firebase'
import axios from './../../config/axios'

export default function CreateUserPage() {
  const router = useRouter()

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

          sessionStorage.setItem('userUID', response.data.userUid)

          alert('usuário criado com sucesso!')
          router.push('/authentication/login')
        })
        .catch(error => {
          console.log(error.response.data)
          alert('Erro! Verifique suas informações!')
        })
    } else {
      alert('preencha os campos!')
    }
  }

  async function LoginWithGoogle() {
    const provider = new Firebase.auth.GoogleAuthProvider()

    firebase.auth()
      .signInWithPopup(provider)
      .then(result => {
        const credential = result.credential
        const user = result.user

        const uid = user.uid
        sessionStorage.setItem('userUID', uid)

        alert('Logado com sucesso!')
        router.push('/perfil/define')
      })
      .catch(error => {
        // Handle Errors here.
        const errorCode = error.code
        const errorMessage = error.message
        // The email of the user's account used.
        const email = error.email
        // The firebase.auth.AuthCredential type that was used.
        const credential = error.credential

        alert('Erro ao Logar com Google')
      })
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
          arrayOfButtonsInformations={[
            {
              textButton: 'Criar usuário',
              onClick: () => createUser()
            },
            {
              textButton: 'Entrar com google',
              onClick: () => LoginWithGoogle()
            }
          ]}
        />
      </div>
    </Layout>
  )
}