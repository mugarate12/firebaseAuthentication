import { useState } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'

import {
  Layout
} from './../../components'
import {
  GenericForm
} from './../../containers'

import styles from './Login.module.css'

import firebase, { Firebase } from './../../config/firebase'
import axios from './../../config/axios'

export default function Login() {
  const router = useRouter()

  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')

  async function loginUser() {
    const fieldsNotEmpty = !!email && !!password
    
    if (fieldsNotEmpty) {
      await axios.post('/api/users/login', {
        email,
        password
      })
        .then(response => {
          console.log(response.data)
          
          sessionStorage.setItem('userUID', response.data.userUid)
          alert('Usuário logado com sucesso!')
          router.push('/perfil/define')
        })
        .catch(error => {
          console.log(error.response.data)

          alert('error')
        })
    } else {
      alert('preencha todos os campos!')
    }
  }

  async function LoginWithGoogle() {
    const provider = new Firebase.auth.GoogleAuthProvider()

    firebase.auth()
      .signInWithPopup(provider)
      .then(async (result) => {
        const credential = result.credential
        const user = result.user
        console.log('credencial', credential)
        console.log('user', user)

        const uid = user.uid
        sessionStorage.setItem('userUID', uid)

        router.push('/perfil/define')
        // alert('Logado com sucesso!')
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
        <title>Logar</title>
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
              textButton: 'Entrar',
              onClick: () => loginUser()
            },
            {
              textButton: 'Entrar com google',
              onClick: () => LoginWithGoogle()
            }
          ]}
        />
      </div>
    </Layout>
  );
}