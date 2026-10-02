// Coordena: recebe a requisição, chama o service e monta a resposta HTTP.
import { usersService } from '../services/users.service.js'

export async function listUsers(req, res, next) {
    try {
        res.json(await usersService.listUsers())
    } catch (err) {
        next(err)
    }
}

export async function getUser(req, res, next) {
    try {
        res.json(await usersService.getUser(Number(req.params.id)))
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
        const atualizado = await usersService.updateUser(Number(req.params.id), req.body)
        res.json(atualizado)
    } catch (err) {
        next(err)
    }
}