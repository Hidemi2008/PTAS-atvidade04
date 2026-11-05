// Regras de negócio: aqui mora o que o SISTEMA decide.
import { productsModel } from '../models/products.model.js'

function httpError(status, message) {
    const erro = new Error(message)
    erro.status = status
    return erro
}

export const productsService = {
    async listProducts() {
        return productsModel.findAll()
    },

    async getProduct(id) {
        const product = await productsModel.findById(id)
        if (!product) throw httpError(404, 'não encontrado')
        return product
    },

    async createProduct(data) {
        return productsModel.create(data)
    },

    async updateProduct(id, data) {
        const existente = await productsModel.findById(id)
        if (!existente) throw httpError(404, 'não encontrado')

        return productsModel.update(id, data)
    },

    async deleteProduct(id) {
        const existente = await productsModel.findById(id)
        if (!existente) throw httpError(404, 'não encontrado')

        await productsModel.remove(id)
    },
}
