import { Fluence, KeyPair } from '@fluencelabs/fluence'
import { krasnodar } from '@fluencelabs/fluence-network-environment'

import {registerEventService, EventServiceDef} from './services/_aqua/EventService'

const peerId = '12D3KooWJBjU564QNF8MKQnyPXqvcgf4bxp7hHLiwYp8zkgMwpbz'
const publicKey = 'CAESIHxWxmPmfcHVAkxP1ahfyCXrTwUNTymZv8gmJVC5mNLZ'

async function server() {
  await Fluence.start({
    connectTo: krasnodar[0],
    KeyPair: await KeyPair.fromEd25519SK(Buffer.from(publicKey, 'base64'))
  })

  // all services declarations here
  // Event -> emit -> perfrom action
  // <- result with the event back to client peer <- browser
  // register callbacks with Eventbased mechanisms
}

export { server }