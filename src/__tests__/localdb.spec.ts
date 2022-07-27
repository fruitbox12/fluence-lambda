jest.mock('../services/localDb')
import { getSharedFilesByPublicKey, saveFileshare } from "../services/localDb"
import {File} from '../services/types'

describe("local-db tests", () => {
  const mockFile: File = {path: 'Qtestpath', timestamp: Date.now()}
  const mockfiles: Array<File> = [mockFile, mockFile, mockFile]

  it('should save a file details to the db', async () => {
    
    getSharedFilesByPublicKey.mockImplemantation((publicKey: string) => {
      return mockfiles
    })
    
    expect(getSharedFilesByPublicKey('0xtest')).toBeCalledWith('0xtest')
  })
})