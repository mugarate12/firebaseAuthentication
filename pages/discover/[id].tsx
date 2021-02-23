import { GetServerSideProps } from 'next'

import Head from 'next/head'

import { Layout } from './../../components'

import styles from './Discover.module.css'

import { getPerfilType } from './../../firebase/perfil'

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
    let data

    await getPerfilType(String(uid))
      .then(response => {
        data = response.data
      })
      .catch(error => {
        console.log(error)
      })

    console.log('data', data.response.type)
    
    return {
      props: {
        UID: uid,
        type: data.response.type
      }
  }
}