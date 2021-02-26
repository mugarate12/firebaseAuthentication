import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword
} from './../../../firebase/users'
import { createType, getUserType } from './../../../firebase/type'

describe('Firebase', () => {
  describe('Type', () => {
    const user = {
      email: 'typeEmail@mail.com',
      password: 'minhasenha123'
    }
    let userUid: string

    async function createUser() {
      const createUserRequest = await createUserWithEmailAndPassword(user.email, user.password)

      userUid = createUserRequest.data.response['userUid']
    }

    beforeAll(async () => {
      await createUser()
    })

    test('define perfil type of user with userUID and type of user and return sucessful message', async () => {
      const type = 'producer'

      const DefinePerfilRequest = await createType(userUid, type)

      expect(DefinePerfilRequest.data.sucess).toBe('Type created sucessful')
    })

    test('get perfil type of user with userUID and receive sucessful object', async () => {
      const PerfilTypeRequest = await getUserType(userUid)

      expect(PerfilTypeRequest.data.sucess).toBe('get user type sucessful')
      expect(PerfilTypeRequest.data.response['type']).toBeDefined()
    })

    test('failure to define type of user by invalid user for firebase.rules and receive error', async () => {
      const invalidUserUid = 'daaoihdoajdaqonqoeqeq'
      const type = 'producer'

      try {
        const failureDefinePerfilRequest = await createType(invalidUserUid, type)
      } catch (error) {
        expect(error.message).toBeDefined()
      }
    })
  })
})