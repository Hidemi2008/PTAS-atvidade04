// Regras de negócio: aqui mora o que o SISTEMA decide.
import { usersModel } from '../models/users.model.js'

function httpError(status, message) {
    const erro = new Error(message)
    erro.status = status
    return erro
}

export const usersService = {
    async listUsers() {
        return usersModel.findAll()
    },

    async getUser(id) {
        const user = await usersModel.findById(id)
        if (!user) throw httpError(404, 'não encontrado')
        return user
    },

    async createUser(data) {
        const emailJaExiste = (await usersModel.findAll())
            .some(u => u.email === data.email)
        if (emailJaExiste) throw httpError(409, 'e-mail já cadastrado')

        return usersModel.create(data)
    },

    async updateUser(id, data) {
        const existente = await usersModel.findById(id)
        if (!existente) throw httpError(404, 'não encontrado')

        // Extra: trocar o e-mail para o de OUTRO usuário também é conflito
        if (data.email && data.email !== existente.email) {
            const emailEmUso = (await usersModel.findAll())
                .some(u => u.email === data.email && u.id !== id)
            if (emailEmUso) throw httpError(409, 'e-mail já cadastrado')
        }

        return usersModel.update(id, data)
    },
}