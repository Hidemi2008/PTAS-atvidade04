// Único arquivo que "sabe" que os produtos moram em um arquivo JSON.
import { readProducts, writeProducts } from '../db.js'

export const productsModel = {
  async findAll() {
    return (await readProducts()).filter(p => !p.deletedAt)
  },

  async findById(id) {
    const product = (await readProducts()).find(p => p.id === id && !p.deletedAt)
    return product || null
  },

  async create(data) {
    const products = await readProducts()
    const id = products.length ? Math.max(...products.map(p => p.id)) + 1 : 1
    const novo = { id, ...data }
    products.push(novo)
    await writeProducts(products)
    return novo
  },

  // Devolve o produto atualizado ou null se não existir
  async update(id, data) {
    const products = await readProducts()
    const i = products.findIndex(p => p.id === id && !p.deletedAt)
    if (i === -1) return null
    products[i] = { ...products[i], ...data, id } // id nunca é sobrescrito
    await writeProducts(products)
    return products[i]
  },

  // Soft delete (mesmo padrão dos users). Devolve true/false
  async remove(id) {
    const products = await readProducts()
    const i = products.findIndex(p => p.id === id && !p.deletedAt)
    if (i === -1) return false
    products[i].deletedAt = new Date().toISOString()
    await writeProducts(products)
    return true
  },
}