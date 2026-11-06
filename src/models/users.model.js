import { ObjectId } from 'mongodb'
import { conectar } from '../data/db.js'

function mapUser(user) {
  return { ...user, id: String(user._id) }
}

function toObjectId(id) {
  return ObjectId.isValid(id) ? new ObjectId(id) : null
}

export const usersModel = {
  async findAll() {
    const db = await conectar()
    const users = await db.collection('users').find().toArray()
    return users.filter(user => !user.deletedAt).map(mapUser)
  },

  async findById(id) {
    const objectId = toObjectId(id)
    if (!objectId) return null

    const db = await conectar()
    const user = await db.collection('users').findOne({ _id: objectId })
    return user && !user.deletedAt ? mapUser(user) : null
  },

  async create(data) {
    const db = await conectar()
    const result = await db.collection('users').insertOne(data)
    return mapUser({ ...data, _id: result.insertedId })
  },

  async update(id, data) {
    const objectId = toObjectId(id)
    if (!objectId) return null

    const db = await conectar()
    const result = await db.collection('users').findOneAndUpdate(
      { _id: objectId, deletedAt: { $exists: false } },
      { $set: data },
      { returnDocument: 'after' },
    )
    return result ? mapUser(result) : null
  },
}
