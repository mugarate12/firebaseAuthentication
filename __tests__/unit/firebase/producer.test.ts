import Users from './../../../firebase/users'
import Types from './../../../firebase/types'
import Producers from './../../../firebase/producers'

describe('Firebase', () => {
  describe('Producer', () => {
    const userListener = {
      email: 'ListenerEmail@mail.com',
      password: 'minhasenha123'
    }
    const userProducer = {
      email: 'ProducerEmail@mail.com',
      password: 'minhasenha123'
    }
    let userListenerUid: string
    let userProducerUid: string

    async function createUser(email: string, password: string, isProducer: boolean) {
      const users = new Users()

      const createUserRequest = await users.createUserWithEmailAndPassword(email, password)

      if (isProducer) {
        userProducerUid = createUserRequest.data.response['userUid']
      } else {
        userListenerUid = createUserRequest.data.response['userUid']
      }
    }

    async function createNonProducerType() {
      const types = new Types()

      await types.create(userListenerUid, 'listener')
    }

    async function createProducerType() {
      const types = new Types()

      await types.create(userProducerUid, 'producer')
    }

    beforeAll(async () => {
      await createUser(userListener.email, userListener.password, false)
      await createNonProducerType()

      await createUser(userProducer.email, userProducer.password, true)
      await createProducerType()
    })

    test('sucessful create information on Producer collection to valid user', async () => {
      const producers = new Producers()

      const CreateProducerRequest = await producers.create(userProducerUid)

      expect(CreateProducerRequest.data.sucess).toBe('producer data created sucessful')
    })

    test('failure create information on Producer collection to valid user', async () => {
      const producers = new Producers()

      try {
        const CreateProducerRequest = await producers.create(userListenerUid)
      } catch (error) {
        expect(error.message).toBeDefined()
      }
    })
  })
})
