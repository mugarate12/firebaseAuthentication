import Users from './../../../firebase/users'
import Profiles from './../../../firebase/profiles'

describe('Firebase', () => {
  describe('Profile', () => {
    const user = {
      email: 'profileEmail@mail.com',
      password: 'minhasenha123'
    }
    let userUid: string
    const userData = {
      name: 'profile',
      contact: 'XX-XXXXXXXXX',
      username: 'profile_username'
    }

    async function createUser() {
      const users = new Users()

      const createUserRequest = await users.createUserWithEmailAndPassword(user.email, user.password)

      userUid = createUserRequest.data.response['userUid']
    }

    beforeAll(async () => {
      await createUser()
    })
    
    test('create profile user with userUID and pseudo informations and receive sucess object data', async () => {
      const profiles = new Profiles()

      const CreateProfileRequest = await profiles.create(userUid, userData.name, userData.contact, userData.username)

      expect(CreateProfileRequest.data.sucess).toBe('Profile created sucessful')
    })

    test('get user profile with userUID and receive sucessful object response', async () => {
      const profiles = new Profiles()

      const getProfileRequest = await profiles.get(userUid)

      expect(getProfileRequest.data.sucess).toBe('get user profile sucessful')
      expect(getProfileRequest.data.response['name']).toBe(userData.name)
      expect(getProfileRequest.data.response['contact']).toBe(userData.contact)
      expect(getProfileRequest.data.response['username']).toBe(userData.username)
    })
  })
})