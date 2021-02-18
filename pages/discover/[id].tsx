import { GetServerSideProps } from 'next'

import Head from 'next/head'

import { Layout } from './../../components'

import styles from './Discover.module.css'

import { database } from './../../config/firebase'

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
    const uid = context.query.id
    const snapshot = await database.collection('perfil').doc(String(uid))
      .get()
    const data = snapshot.data()
    
    return {
      props: {
        UID: uid,
        type: data.tipo
      }
  }
}