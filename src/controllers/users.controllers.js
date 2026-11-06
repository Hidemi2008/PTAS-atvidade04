// Coordena: recebe a requisição, chama o service e monta a resposta HTTP.
import { usersService } from '../services/users.service.js'

export async function listUsers(req, res, next) {
    try {
        const page = Math.max(1, Math.floor(Number(req.query.page) || 1))
        const limit = Math.min(
            100,
            Math.max(1, Math.floor(Number(req.query.limit) || 20)),
        )
        const offset = (page - 1) * limit
        const idade = req.query.idade === undefined
            ? undefined
            : Number(req.query.idade)

        res.json(await usersService.listUsers({
            page,
            limit,
            offset,
            nome: req.query.nome,
            email: req.query.email,
            idade: Number.isNaN(idade) ? undefined : idade,
            sort: req.query.sort,
        }))
    } catch (err) {
        next(err)
    }
}

export async function getUser(req, res, next) {
    try {
        res.json(await usersService.getUser(req.params.id))
    } catch (err) {
        next(err)
    }
}

export async function createUser(req, res, next) {
    try {
        const novo = await usersService.createUser(req.body)
        res.status(201).json(novo)
    } catch (err) {
        next(err)
    }
}

export async function updateUser(req, res, next) {
    try {
        const atualizado = await usersService.updateUser(req.params.id, req.body)
        res.json(atualizado)
    } catch (err) {
        next(err)
    }
}