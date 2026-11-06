// Só o mapa: URL + método HTTP → função do controller.
import { Router } from 'express'
import {
    listUsers,
    getUser,
    createUser,
    updateUser,
    deleteUser,
} from '../controllers/users.controllers.js'
import { valida } from '../middlewares/valida.js'
import { updateUserSchema, userSchema } from '../schemas/user.schema.js'

const router = Router()

router.get('/', listUsers)
router.get('/:id', getUser)
router.post('/', valida(userSchema), createUser)
router.put('/:id', valida(updateUserSchema), updateUser)
router.delete('/:id', deleteUser)

export default router