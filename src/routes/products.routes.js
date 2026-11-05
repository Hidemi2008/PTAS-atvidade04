// Só o mapa: URL + método HTTP → função do controller.
import { Router } from 'express'
import {
    listProducts, getProduct, createProduct, updateProduct, deleteProduct,
} from '../controllers/products.controllers.js'
import { valida } from '../middlewares/valida.js'
import { productSchema, updateProductSchema } from '../schemas/product.schema.js'

const router = Router()

router.get('/', listProducts)
router.get('/:id', getProduct)
router.post('/', valida(productSchema), createProduct)
router.put('/:id', valida(updateProductSchema), updateProduct)
router.delete('/:id', deleteProduct)

export default router