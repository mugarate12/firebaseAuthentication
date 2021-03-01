import { auth, firebaseModule } from './../../../config/firebase'
import Users from './../../../firebase/users'

describe('Firebase', () => {
  describe('Auth ', () => {
    const user = {
      email: 'meumail@mail.com',
      password: 'minhasenha123'
    }

    test('create user with email and password and get response object', async () => {
      const users = new Users()

      const createUserRequest = await users.createUserWithEmailAndPassword(user.email, user.password)

      expect(createUserRequest.data.sucess).toBe('User created sucessful')
      expect(createUserRequest.data.response['userUid']).toBeDefined()
    })

    test('failure to create user with email and password by user email already exists and get response object', async () => {
      const users = new Users()
      
      try {
        const createUserRequest = await users.createUserWithEmailAndPassword(user.email, user.password)
      } catch (error) {
        expect(error.message).toBeDefined()
      }
    })

    test('sign in user with email and password and get response object', async () => {
      const users = new Users()
      
      const signInRequest = await users.signInWithEmailAndPassword(user.email, user.password)

      expect(signInRequest.data.sucess).toBe('user logged!')
      expect(signInRequest.data.response['userUid']).toBeDefined()
    })

    test('failure sign in user with email and password and get response object', async () => {
      const users = new Users()
      const invalidPassword = 'badPassword'
      
      try{
        const signInRequest = await users.signInWithEmailAndPassword(user.email, invalidPassword)
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