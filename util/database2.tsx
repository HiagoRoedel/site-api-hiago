import { MongoClient } from "mongodb";

const database_url = process.env.DATABASE_URL as string

const client = new MongoClient(database_url, {
})

export default async function connect() {
    client.connect()

    const db = client.db("clientes")

    return { db, client }
}