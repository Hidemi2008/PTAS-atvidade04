// Rascunho: autenticação reaproveitando o usersModel.
import { usersModel } from '../models/users.model.js'
// import bcrypt from 'bcrypt'
// import jwt from 'jsonwebtoken'

function httpError(status, message) {
    const erro = new Error(message)
    erro.status = status
    return erro
}

// Login: busca por e-mail (findAll) e confere a senha
export async function autenticar(email, senha) {
    const user = (await usersModel.findAll()).find(u => u.email === email)

    // Mesma mensagem para "não existe" e "senha errada" (não vaza qual e-mail existe)
    // TODO: trocar por `await bcrypt.compare(senha, user.senhaHash)`
    if (!user || user.senha !== senha) {
        throw httpError(401, 'credenciais inválidas')
    }

    // TODO: const token = jwt.sign({ sub: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' })
    const { senha: _omit, ...seguro } = user // nunca devolver a senha
    return seguro // TODO: return { user: seguro, token }
}

// Usado depois, quando o token já foi validado: carrega o usuário pelo id (findById)
export async function usuarioDoToken(id) {
    const user = await usersModel.findById(id)
    if (!user) throw httpError(401, 'sessão inválida') // ex.: usuário removido por soft delete
    const { senha: _omit, ...seguro } = user
    return seguro
}