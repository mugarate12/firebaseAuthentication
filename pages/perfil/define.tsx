import { useState } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'

import {
  Layout
} from './../../components'
import {
  GenericForm
} from './../../containers'

import styles from './Define.module.css'

import { createPerfilType } from './../../firebase/perfil'

export default function DefinePerfil() {
  const router = useRouter()

  const [typePerfil, setTypePerfil] = useState<string>('ouvinte')

  async function defineType() {
    const uid = sessionStorage.getItem('userUID')
    const typeFieldNotEmpty = !!typePerfil

    if (typeFieldNotEmpty) {
      await createPerfilType(uid, typePerfil)
        .then(response => {
          console.log(response)

          router.push(`/discover/${uid}`)
        })
        .catch(error => {
          console.log(error)
        })
    }
  }

  return (
    <Layout>
      <Head>
        <title>Definir perfil</title>
      </Head>

      <div className={styles.container}>
        <select
          className={styles.select}
          name="perfil type" 
          value={typePerfil} 
          onChange={(e) => setTypePerfil(e.target.value)}
        >
          <option value="ouvinte">Ouvinte</option>
          <option value="produtor">Produtor</option>
        </select>

        <GenericForm 
          arrayOfButtonsInformations={[
            {
              textButton: 'Definir tipo',
              onClick: () => defineType()
            }
          ]}
        />
      </div>
    </Layout>
  );
}