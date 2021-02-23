import {
  createUserWithEmailAndPassword
} from './../../../firebase/users'
import {
  createPerfilType,
  getPerfilType
} from './../../../firebase/perfil'
import axios from 'axios'

describe('Firebase', () => {
  describe('Perfil', () => {
    const user = {
      email: 'meumail2@mail.com',
      password: 'minhasenha123'
    }
    let userUid: string

    async function createUser() {
      const createUserRequest = await createUserWithEmailAndPassword(user.email, user.password)

      userUid = createUserRequest.data.response['userUid']
    }

    async function clearAuthentication(projectID: string) {
      await axios.delete(`http://localhost:9099/emulator/v1/projects/${projectID}/accounts`)
    }

    async function clearFirestore(projectID: string) {
      await axios.delete(`http://localhost:8080/emulator/v1/projects/${projectID}/databases/(default)/documents`)
    }

    beforeAll(async () => {
      const projectID =  'fir-authenticationstudy'

      await clearAuthentication(projectID)
      await clearFirestore(projectID)
      await createUser()
    })

    test('define perfil of user with userUID and type of user (small example) and get response object', async () => {
      const type = 'listener'

      const DefinePerfilRequest = await createPerfilType(userUid, type)

      expect(DefinePerfilRequest.data.sucess).toBe('perfil type created sucessful')
    })

    test('get perfil of user with userUID and get response object', async () => {
      const getPerfilRequest = await getPerfilType(userUid)

      expect(getPerfilRequest.data.sucess).toBe('get perfil type sucessful')
      expect(getPerfilRequest.data.response['type']).toBeDefined()
    })
  })
})