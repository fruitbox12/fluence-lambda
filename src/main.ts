import { Fluence, KeyPair } from '@fluencelabs/fluence'
import { krasnodar } from '@fluencelabs/fluence-network-environment'
import Web3 from 'web3'

import { registerEventService, EventServiceDef } from './services/_aqua/EventService'
import { registerFileService, FileServiceDef } from './services/_aqua/FileService'
import { registerAccountService, AccountServiceDef } from './services/_aqua/AccountService'
import { AccountService, FileService } from './services'

const peerId = '12D3KooWJBjU564QNF8MKQnyPXqvcgf4bxp7hHLiwYp8zkgMwpbz'
const publicKey = 'CAESIHxWxmPmfcHVAkxP1ahfyCXrTwUNTymZv8gmJVC5mNLZ'

async function main() {
  await Fluence.start({
    connectTo: krasnodar[0],
    KeyPair: await KeyPair.fromEd25519SK(Buffer.from(publicKey, 'base64'))
  })

  // all services declarations here
  // Event -> emit -> perform action
  // <- result with the event back to client peer <- browser
  // register callbacks with Eventbased mechanisms
  const INFURA_API_KEY = process.env.INFURA_API_KEY
  const INFURA_PROVIDER_URL = `https://goerli.infura.io/v3/${INFURA_API_KEY}`
  const provider = new Web3.providers.HttpProvider(INFURA_PROVIDER_URL)
  const web3 = new Web3(provider)

  // services
  // @ts-ignore
  registerAccountService(new AccountService(web3))
  // @ts-ignore
  registerFileService(new FileService())
}

export { main }