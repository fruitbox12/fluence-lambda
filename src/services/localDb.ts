// sqlite db

// sqlite db should live inside the peer
// find a way to handle requests to the peer
// instant file sharing -> refer to the docs on content addresssing and ci
// this lives inside the client peer
import sqlite3 from "sqlite3";
import { open, Database } from "sqlite";

export class LocalDb {
  
  public static createDbConnections = async () => {
    const accountsDbOptions = {
      filename: './accounts.db',
      driver: sqlite3.cached.Database
    }

    const fileSharingDbOptions = {
      filename: './fileSharing.db',
      driver: sqlite3.cached.Database
    }
    
    
    try {
      const [accountsDb, fileSharingDb ] = await Promise.all([open(accountsDbOptions), open(fileSharingDbOptions)])
      return [accountsDb, fileSharingDb]
    } catch (error) {
      console.info(`Failed to open db with`, error);
    }
  }
}
