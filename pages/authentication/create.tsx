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

import { createUserWithEmailAndPassword, signInWithGoogle } from './../../firebase/users'

export default function CreateUserPage() {
  const router = useRouter()

  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')

  async function createUser() {
    const fieldsNotEmpty = !!email && !!password
    
    if (fieldsNotEmpty) {
      await createUserWithEmailAndPassword(email, password)
        .then(response => {
          // console.log(response.data)
          // console.log(response.data.response['userUid'])
          sessionStorage.setItem('userUID', response.data.response['userUid'])

          router.push('/authentication/login')
        })
        .catch(error => {
          alert('Erro ao cadastrar usuário')
        })
    } else {
      alert('preencha os campos!')
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

        alert('error')
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