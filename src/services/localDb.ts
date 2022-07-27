import sqlite3 from 'sqlite3'
import {open} from 'sqlite'

async function openDb(dbName: string) {
  return open({
    filename: dbName,
    driver: sqlite3.Database
  })
}

export async function saveFileshare(path: string, publicKey: string, timestamp: number)  {
  try {
    const fileDb = await openDb('fileShare.db')
    await fileDb.exec(`INSERT INTO files VALUES (${path}, ${publicKey}, ${timestamp})`)
  } catch(error) {
    console.error(`Failed operation with Error:`, error)
  }
}

export async function getSharedFilesByPublicKey(publicKey: string) {
  try {
    const fileDb = await openDb('fileShare.db')
    const files = await fileDb.all('SELECT FROM files WHERE publicKey=?', publicKey)
    return files
  } catch(error) {
    console.error(`Failed operation with Error:`, error)
  }
}