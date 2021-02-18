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

    // o axios buga por não conseguir usar uma porta diferente a qual a aplicação está usando
    // já o fetch não consegue passar o parametro "/api/perfil/:userUID" sendo necessário
    // a redundância de inserir a frente o query param
    const snapshot = await fetch(`http://localhost:3000/api/perfil/${uid}?userUID=${uid}`, {
      method: 'GET'
    })
    const data = await snapshot.json()
    
    return {
      props: {
        UID: uid,
        type: data.type
      }
  }
}