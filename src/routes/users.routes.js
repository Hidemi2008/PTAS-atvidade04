// Só o mapa: URL + método HTTP → função do controller.
import { Router } from 'express'
import { listUsers, getUser, createUser, updateUser } from '../controllers/users.controller.js'

const router = Router()

router.get('/', listUsers)
router.get('/:id', getUser)
router.post('/', createUser)
router.put('/:id', updateUser)

export default router