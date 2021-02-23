import Head from 'next/head'
import { useRouter } from 'next/router'

import {
  Layout
} from './../components'

import styles from '../styles/Home.module.css'

export default function Home() {
  const router = useRouter()

  return (
    <Layout>
      <Head>
        <title>Home Page</title>
      </Head>

      <div className={styles.container}>
        <button
          onClick={() => router.push('/authentication/create')}
        >Criar usuário</button>
      </div>
    </Layout>
  )
}
