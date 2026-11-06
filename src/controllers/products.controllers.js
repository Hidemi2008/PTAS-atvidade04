// Recebe a requisição, chama o service e monta a resposta HTTP.
import { productsService } from '../services/products.service.js'

export async function listProducts(req, res, next) {
    try {
        const page = Math.max(1, Math.floor(Number(req.query.page) || 1))
        const limit = Math.min(
            100,
            Math.max(1, Math.floor(Number(req.query.limit) || 20)),
        )
        const offset = (page - 1) * limit
        const preco = req.query.preco === undefined
            ? undefined
            : Number(req.query.preco)

        res.json(await productsService.listProducts({
            page,
            limit,
            offset,
            nome: req.query.nome,
            preco: Number.isNaN(preco) ? undefined : preco,
            tags: req.query.tags,
            sort: req.query.sort,
        }))
    } catch (err) { next(err) }
}

export async function getProduct(req, res, next) {
    try {
        res.json(await productsService.getProduct(Number(req.params.id)))
    } catch (err) { next(err) }
}

export async function createProduct(req, res, next) {
    try {
        res.status(201).json(await productsService.createProduct(req.body))
    } catch (err) { next(err) }
}

export async function updateProduct(req, res, next) {
    try {
        res.json(await productsService.updateProduct(Number(req.params.id), req.body))
    } catch (err) { next(err) }
}

export async function deleteProduct(req, res, next) {
    try {
        await productsService.deleteProduct(Number(req.params.id))
        res.status(204).end()
    } catch (err) { next(err) }
}