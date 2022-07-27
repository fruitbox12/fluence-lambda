// unit tests:
import Web3 from 'web3'
import { AccountService, FileService, User } from '../services'
import { SignatureObject } from 'web3-core'

describe('#services Test', () => {
  const INFURA_API_KEY = process.env.INFURA_API_KEY
  const INFURA_PROVIDER_URL = `https://goerli.infura.io/v3/${INFURA_API_KEY}`
  const provider = new Web3.providers.HttpProvider(INFURA_PROVIDER_URL)

  let web3: Web3
  let accountService: AccountService
  let testAccount: User
  // teardown
  beforeAll(async () => {
    web3 = new Web3(provider)
    accountService = new AccountService(web3)
    testAccount = await accountService.createAccount() as User
  })

  describe('AccountService', () => {
    it('should create a user account', async () => {
      const user = await accountService.createAccount()
      expect(user?.address).toBeDefined()
    })

    it('should login a user by verifying a signed message', async () => {
      const { privateKey } = testAccount
      let signatureObject = web3.eth.accounts.sign('TEST', privateKey) as SignatureObject
      const isAuthenticated = await accountService.login(signatureObject, privateKey)
      expect(isAuthenticated).toBe(true)
    })
  })

  describe('FileService', () => {
    let fileService: FileService

    beforeAll(() => {
      fileService = new FileService()
    })

    it('should get uploaded files', async () => {
      const files = await fileService.getSharedFiles(testAccount.address)
      expect(files).toBeDefined()
    })

    it('should share a file to a recepient', async () => {
      const file = {
        path: 'test-cid'
      }
      
      const recepient = '0xtest'
      const sent = await fileService.shareFile(recepient, file)
      expect(sent).toBe(true)
    })

  })

})