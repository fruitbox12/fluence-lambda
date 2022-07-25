// unit tests:
import Web3 from 'web3'

import { AccountService, User } from '../services'
import HDWallet from '@truffle/hdwallet-provider'
import { SignatureObject } from 'web3-core'

describe('#services Test', () => {
  const INFURA_API_KEY = process.env.INFURA_API_KEY
  const INFURA_PROVIDER_URL = `https://goerli.infura.io/v3/${INFURA_API_KEY}`
  const provider = new Web3.providers.HttpProvider(INFURA_PROVIDER_URL)
  
  let web3: Web3
  let accountService: AccountService
  let testAccount: User
  // teardown
  beforeAll( async () => {
    web3 = new Web3(provider)
    accountService = new AccountService(web3)
    testAccount = await accountService.createAccount() as User
  })

  it('should create a user account', async () => {
    const user = await accountService.createAccount()
    expect(user?.address).toBeDefined()
  })

  it('should login a user by verifying a signed message', async () => {
    const {privateKey} = testAccount
    let signatureObject = web3.eth.accounts.sign('TEST', privateKey) as SignatureObject
    const isAuthenticated = await accountService.login(signatureObject, privateKey)
    expect(isAuthenticated).toBe(true)
  })

  // make tests pass:
  // 1. FileService
  // 2. PeerService
  // 3. IPFSService
  // 4. DBIntegration

})