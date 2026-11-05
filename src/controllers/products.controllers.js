// Recebe a requisição, chama o service e monta a resposta HTTP.
import { productsService } from '../services/products.service.js'

export async function listProducts(req, res, next) {
    try {
        res.json(await productsService.listProducts())
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