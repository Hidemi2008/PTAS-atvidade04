// Regras de negócio: aqui mora o que o SISTEMA decide.
import { productsModel } from '../models/products.model.js'
import { paginate, sortItems } from './listing.service.js'

function httpError(status, message) {
    const erro = new Error(message)
    erro.status = status
    return erro
}

export const productsService = {
    async listProducts(options = { page: 1, limit: 20, offset: 0 }) {
        const { nome, preco, tags, sort } = options
        const products = await productsModel.findAll()
        const filtered = products.filter(product => {
            const nomeMatches = nome === undefined
                || product.nome.toLowerCase().includes(nome.toLowerCase())
            const precoMatches = preco === undefined || product.preco === preco
            const tagsMatches = tags === undefined
                || product.tags?.some(tag => tag.toLowerCase().includes(tags.toLowerCase()))
            return nomeMatches && precoMatches && tagsMatches
        })
        const sorted = sortItems(filtered, sort)
        return paginate(sorted, options)
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
