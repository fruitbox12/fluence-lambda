import Web3 from 'web3'
import { create, IPFSHTTPClient } from 'ipfs-http-client'
import { SignatureObject } from 'web3-core'
import { CallParams } from '@fluencelabs/fluence'

import { File } from './types'
import { FileServiceDef } from './_aqua/FileService'
import { AccountServiceDef } from './_aqua/AccountService'
import { getSharedFilesByPublicKey, saveFileshare } from './localDb'




const createConnection = () => {
  const ipfs = create({ host: 'ipfs.infura.io', port: 5001, protocol: 'https' })
  return ipfs
}

export class FileService implements FileServiceDef {
  // @ts-ignore
  public uploadFile = async (file: File | Buffer) => {
    const ipfs = createConnection()
    const { path } = await ipfs.add(file)
    return path
  }

  // @ts-ignore
  shareFile = async (recepient: string, file: File | Buffer) => {
    try {
      const ipfs = createConnection()
      const { path } = await ipfs.add(file)
      const timestamp = Date.now()

      return await saveFileshare(path, recepient, timestamp)
    } catch (error) {
      console.error(`Failed Operation with: Error`, error)
    }
  }

   // @ts-ignore : Aqua: what's the Aqua equivalent of `undefined`
  getSharedFiles = async(publicKey: string, callParams?: CallParams<'publicKey'>): Promise<Array<File> | void> => {
    
    try {
      const files = await getSharedFilesByPublicKey(publicKey)
      return files as Array<File>
    } catch (error) {
      console.error(`Failed operation with:`, error)
    }

  }
}

export type User = {
  privateKey: string
  address: string
}

export class AccountService implements AccountServiceDef {

  private _web3: Web3
  constructor(provider: any) {
    this._web3 = new Web3(provider)
  }

  // @ts-ignore : Aqua: what's the Aqua equivalent of `undefined`
  public createAccount = async (): Promise<User | undefined> => {

    try {
      const account = this._web3.eth.accounts.create()
      const { address, privateKey } = account
      const user = { address, privateKey }
      return user
    } catch (error) {
      console.info('failed to create a new use account with E:', error)
    }

  }

  public login = async (signatureObject: SignatureObject, privateKey: string, callParams?: CallParams<'signatureObject' | 'privateKey'>): Promise<boolean> => {
    const { address } = this._web3.eth.accounts.privateKeyToAccount(privateKey)
    const publicKey = this._recoverAddress(signatureObject)
    // verify message signer
    return address.toLocaleLowerCase() === publicKey.toLocaleLowerCase()
  }

  private _recoverAddress = (signatureObject: SignatureObject) => {
    const publicKey = this._web3.eth.accounts.recover(signatureObject)
    return publicKey
  }

}

// trigger notification on frontend
// long running service to alert user of new file
// use webworker to call aqua service?
// send/receive should be instant
// aws-lambda style? event mechanisms