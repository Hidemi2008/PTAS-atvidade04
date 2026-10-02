// Recebe a requisição, chama o model e monta a resposta HTTP.
import { productsModel } from '../models/products.model.js'

export async function listProducts(req, res, next) {
    try {
        res.json(await productsModel.findAll())
    } catch (err) { next(err) }
}

export async function getProduct(req, res, next) {
    try {
        const product = await productsModel.findById(Number(req.params.id))
        if (!product) return res.status(404).json({ erro: 'não encontrado' })
        res.json(product)
    } catch (err) { next(err) }
}

export async function createProduct(req, res, next) {
    try {
        res.status(201).json(await productsModel.create(req.body))
    } catch (err) { next(err) }
}

export async function updateProduct(req, res, next) {
    try {
        const product = await productsModel.update(Number(req.params.id), req.body)
        if (!product) return res.status(404).json({ erro: 'não encontrado' })
        res.json(product)
    } catch (err) { next(err) }
}

export async function deleteProduct(req, res, next) {
    try {
        const ok = await productsModel.remove(Number(req.params.id))
        if (!ok) return res.status(404).json({ erro: 'não encontrado' })
        res.status(204).end()
    } catch (err) { next(err) }
}