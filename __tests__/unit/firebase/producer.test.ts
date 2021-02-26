import {
  createUserWithEmailAndPassword
} from './../../../firebase/users'
import { createType } from './../../../firebase/type'
import { createProducer } from './../../../firebase/producer'

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
      const createUserRequest = await createUserWithEmailAndPassword(email, password)

      if (isProducer) {
        userProducerUid = createUserRequest.data.response['userUid']
      } else {
        userListenerUid = createUserRequest.data.response['userUid']
      }
    }

    async function createNonProducerType() {
      await createType(userListenerUid, 'listener')
    }

    async function createProducerType() {
      await createType(userProducerUid, 'producer')
    }

    beforeAll(async () => {
      await createUser(userListener.email, userListener.password, false)
      await createNonProducerType()

      await createUser(userProducer.email, userProducer.password, true)
      await createProducerType()
    })

    test('sucessful create information on Producer collection to valid user', async () => {
      const CreateProducerRequest = await createProducer(userProducerUid)

      expect(CreateProducerRequest.data.sucess).toBe('producer data created sucessful')
    })

    test('failure create information on Producer collection to valid user', async () => {
      try {
        const CreateProducerRequest = await createProducer(userListenerUid)
      } catch (error) {
        expect(error.message).toBeDefined()
      }
    })
  })
})
