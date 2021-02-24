import {
  createUserWithEmailAndPassword
} from './../../../firebase/users'
import {
  createPerfilType,
  getPerfilType
} from './../../../firebase/perfil'

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

    beforeAll(async () => {
      const projectID =  'fir-authenticationstudy'

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