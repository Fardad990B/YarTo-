import { MongoClient, type Db } from 'mongodb'

let client: MongoClient | undefined
let database: Db | undefined

export async function getDb() {
  if (database) return database
  const config = useRuntimeConfig()
  client = new MongoClient(config.mongodbUri)
  await client.connect()
  database = client.db(config.mongodbDb)
  await Promise.all([
    database.collection('users').createIndex({ email: 1 }, { unique: true }),
    database.collection('sessions').createIndex({ userId: 1, expiresAt: 1 })
  ])
  return database
}
