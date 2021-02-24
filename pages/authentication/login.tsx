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

import { signInWithEmailAndPassword, signInWithGoogle } from './../../firebase/users'

export default function Login() {
  const router = useRouter()

  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')

  async function loginUser() {
    const fieldsNotEmpty = !!email && !!password
    
    if (fieldsNotEmpty) {
      await signInWithEmailAndPassword(email, password)
        .then(response => {
          sessionStorage.setItem('userUID', response.data.response['userUid'])

          alert('user logged sucessful!')
          router.push('/perfil/define')
        })
    } else {
      alert('preencha todos os campos!')
    }
  }

  async function LoginWithGoogle() {
    await signInWithGoogle()
      .then(response => {
        console.log(response)
        const userUID = response.data.response['userUid']

        sessionStorage.setItem('userUID', userUID)

        alert('suer logged sucessful')
        router.push('/perfil/define')
      })
      .catch(error => {
        console.log(error)

        
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