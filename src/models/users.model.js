// src/models/users.model.js
// Único arquivo que "sabe" que os usuários moram em um arquivo JSON.
import { readUsers, writeUsers } from '../db.js'

export const usersModel = {
  // Devolve apenas usuários ativos (não removidos via soft delete)
  async findAll() {
    return (await readUsers()).filter(u => !u.deletedAt)
  },

  // Busca um usuário pelo id; devolve null se não existir
  async findById(id) {
    const user = (await readUsers()).find(x => x.id === id && !x.deletedAt)
    return user || null
  },

  // Cria um usuário novo, gerando o id como "maior id atual + 1"
  async create(data) {
    const users = await readUsers()
    const id = users.length ? Math.max(...users.map(u => u.id)) + 1 : 1
    const novo = { id, ...data }
    users.push(novo)
    await writeUsers(users)
    return novo
  },
  // update, remove… (mesmo padrão: mexem nos dados, devolvem dados)
}