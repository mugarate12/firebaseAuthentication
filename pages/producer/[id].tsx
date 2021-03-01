import { useState } from 'react'
import { useRouter } from 'next/router'
import { GetServerSideProps } from 'next'
import Head from 'next/head'

import { getProducer } from './../../firebase/producer'

import {
  Layout
} from './../../components'
import {
  GenericForm
} from './../../containers'

import styles from './Producer.module.css'

interface ProducerInterface {
  uid: string;
  example: string;
}

export default function ProducerPage({ uid, example }: ProducerInterface) {
  return (
    <Layout>
      <Head>
        <title>Página do produtor</title>
      </Head>

      <div className={styles.container}>
        <h5 className={styles.h5}>usuario de id: {uid}</h5>
        <h5 className={styles.h5}>informação de produtor: {example}</h5>
      </div>
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const uid = context.query.id
  let example:string

  await getProducer(String(uid))
    .then(response => {
      console.log(response.data)
      example = response.data.response['example']
    })
    .catch(error => {
      console.log(error)
    })
    
    console.log('exemplo', example)
  
  return {
    props: {
      uid,
      example
    }
  }
}
