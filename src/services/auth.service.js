// src/services/auth.service.js (esboço para o futuro)
import { usersModel } from '../models/users.model.js'

export async function autenticar(email, senha) {
  const user = (await usersModel.findAll()).find(u => u.email === email)
  if (!user || user.senha !== senha) {
    const erro = new Error('credenciais inválidas')
    erro.status = 401
    throw erro
  }
  return user
}