// Regras de negócio: aqui mora o que o SISTEMA decide.
import { usersModel } from '../models/users.model.js'
import { paginate, sortItems } from './listing.service.js'

function httpError(status, message) {
    const erro = new Error(message)
    erro.status = status
    return erro
}

export const usersService = {
    async listUsers(options = { page: 1, limit: 20, offset: 0 }) {
        const { nome, email, idade, sort } = options
        const users = await usersModel.findAll()
        const filtered = users.filter(user => {
            const nomeMatches = nome === undefined
                || user.nome.toLowerCase().includes(nome.toLowerCase())
            const emailMatches = email === undefined
                || user.email.toLowerCase().includes(email.toLowerCase())
            const idadeMatches = idade === undefined || user.idade === idade
            return nomeMatches && emailMatches && idadeMatches
        })
        const sorted = sortItems(filtered, sort)
        return paginate(sorted, options)
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

        try {
            return await usersModel.create(data)
        } catch (err) {
            if (err.code === 11000) throw httpError(409, 'e-mail já cadastrado')
            throw err
        }
    },

    async updateUser(id, data) {
        const existente = await usersModel.findById(id)
        if (!existente) throw httpError(404, 'não encontrado')

        // Extra: trocar o e-mail para o de OUTRO usuário também é conflito
        if (data.email && data.email !== existente.email) {
            const emailEmUso = (await usersModel.findAll())
                .some(u => u.email === data.email && u.id !== String(id))
            if (emailEmUso) throw httpError(409, 'e-mail já cadastrado')
        }

        try {
            return await usersModel.update(id, data)
        } catch (err) {
            if (err.code === 11000) throw httpError(409, 'e-mail já cadastrado')
            throw err
        }
    },

    async deleteUser(id) {
        const existente = await usersModel.findById(id)
        if (!existente) throw httpError(404, 'não encontrado')

        return usersModel.remove(id)
    },
}