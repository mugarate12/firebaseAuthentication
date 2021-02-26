import { GetServerSideProps } from 'next'

import Head from 'next/head'

import { Layout } from './../../components'

import styles from './Discover.module.css'

import { getUserType } from './../../firebase/type'

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
    let type: string

    await getUserType(String(uid))
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