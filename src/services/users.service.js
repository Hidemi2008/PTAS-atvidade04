// src/services/users.service.js
// Regras de negócio: aqui mora o que o SISTEMA decide.
import { usersModel } from '../models/users.model.js'

export const usersService = {
    async createUser(data) {
        const emailJaExiste = (await usersModel.findAll())
            .some(u => u.email === data.email)

        if (emailJaExiste) {
            const erro = new Error('e-mail já cadastrado')
            erro.status = 409 // Conflict — você vai ler isso na Parte 6
            throw erro
        }

        return usersModel.create(data)
    },
}