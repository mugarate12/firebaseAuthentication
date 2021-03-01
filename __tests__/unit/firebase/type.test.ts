import Users from './../../../firebase/users'
import Types from './../../../firebase/types'

describe('Firebase', () => {
  describe('Type', () => {
    const user = {
      email: 'typeEmail@mail.com',
      password: 'minhasenha123'
    }
    let userUid: string

    async function createUser() {
      const users = new Users()

      const createUserRequest = await users.createUserWithEmailAndPassword(user.email, user.password)

      userUid = createUserRequest.data.response['userUid']
    }

    beforeAll(async () => {
      await createUser()
    })

    test('define perfil type of user with userUID and type of user and return sucessful message', async () => {
      const types = new Types()
      const type = 'producer'

      const DefinePerfilRequest = await types.create(userUid, type)

      expect(DefinePerfilRequest.data.sucess).toBe('Type created sucessful')
    })

    test('get perfil type of user with userUID and receive sucessful object', async () => {
      const types = new Types()

      const PerfilTypeRequest = await types.get(userUid)

      expect(PerfilTypeRequest.data.sucess).toBe('get user type sucessful')
      expect(PerfilTypeRequest.data.response['type']).toBeDefined()
    })

    test('failure to define type of user by invalid user for firebase.rules and receive error', async () => {
      const types = new Types()
      const invalidUserUid = 'daaoihdoajdaqonqoeqeq'
      const type = 'producer'

      try {
        const failureDefinePerfilRequest = await types.create(invalidUserUid, type)
      } catch (error) {
        expect(error.message).toBeDefined()
      }
    })
  })
})