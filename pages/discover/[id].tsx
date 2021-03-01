import { GetServerSideProps } from 'next'

import Head from 'next/head'

import { Layout } from './../../components'

import styles from './Discover.module.css'

import Types from './../../firebase/types'

interface DashboardInterface {
  UID: string,
  type: string
}

export default function Dashboard({ UID, type }: DashboardInterface) {
  return (
    <Layout>
      <Head>
        <title>DashBoard</title>
      </Head>

      <div className={styles.container}>
        <h5>Identificador do usuário: {UID}</h5>
        <h5> tipo do usuário: {type}</h5>
      </div>
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const types = new Types()

    const uid = context.query.id
    let type: string

    await types.get(String(uid))
      .then(response => {
        type = response.data.response['type']
      })
      .catch(error => {
        console.log(error)
      })
    
    return {
      props: {
        UID: uid,
        type
      }
  }
}