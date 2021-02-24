import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword
} from './../../../firebase/users'
import { auth, firebaseModule } from './../../../config/firebase'
import axios from 'axios'

describe('Firebase', () => {
  describe('Auth ', () => {
    const user = {
      email: 'meumail@mail.com',
      password: 'minhasenha123'
    }

    // async function clearAuthentication(projectID: string) {
    //   await axios.delete(`http://localhost:9099/emulator/v1/projects/${projectID}/accounts`)
    // }

    beforeAll(async () => {
      const projectID =  'fir-authenticationstudy'

      // await clearAuthentication(projectID)
    })

    test('create user with email and password and get response object', async () => {
      const createUserRequest = await createUserWithEmailAndPassword(user.email, user.password)

      expect(createUserRequest.data.sucess).toBe('User created sucessful')
      expect(createUserRequest.data.response['userUid']).toBeDefined()
    })

    test('failure to create user with email and password by user email already exists and get response object', async () => {
      try {
        const createUserRequest = await createUserWithEmailAndPassword(user.email, user.password)
      } catch (error) {
        expect(error.message).toBeDefined()
      }
    })

    test('sign in user with email and password and get response object', async () => {
      const signInRequest = await signInWithEmailAndPassword(user.email, user.password)

      expect(signInRequest.data.sucess).toBe('user logged!')
      expect(signInRequest.data.response['userUid']).toBeDefined()
    })

    test('failure sign in user with email and password and get response object', async () => {
      const invalidPassword = 'badPassword'
      
      try{
        const signInRequest = await signInWithEmailAndPassword(user.email, invalidPassword)
      } catch (error) {
        expect(error.message).toBeDefined()
      }
    })

    test('sign in user google login social', async () => {
      const SocialLoginRequest = await auth.signInWithCredential(firebaseModule.auth.GoogleAuthProvider.credential(
        '{"sub": "abc123", "email": "foo@example.com", "email_verified": true}'
      ))

      expect(SocialLoginRequest.user.email).toBeDefined()
    })

    test('sign in user facebook login social', async () => {
      const SocialLoginRequest = await auth.signInWithCredential(firebaseModule.auth.FacebookAuthProvider.credential(
        '{"sub": "abc1234", "email": "fooo@example.com", "email_verified": true}'
      ))

      expect(SocialLoginRequest.user.email).toBeDefined()
    })
  })
})