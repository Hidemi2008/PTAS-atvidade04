import 'dotenv/config'
import { MongoClient } from 'mongodb'

const client = new MongoClient(process.env.MONGODB_URI)
let databasePromise

export async function conectar() {
    if (!databasePromise) {
        databasePromise = client.connect().then(async connectedClient => {
            const db = connectedClient.db()
            await db.command({ ping: 1 })
            return db
        }).catch(error => {
            databasePromise = undefined
            throw error
        })
    }

    return databasePromise
}
