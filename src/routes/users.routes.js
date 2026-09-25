// src/routes/users.routes.js
// Só o mapa: URL + método HTTP → função do controller.
import { Router } from 'express'
import { listUsers, getUser } from '../controllers/users.controller.js'

const router = Router()

router.get('/', listUsers)
router.get('/:id', getUser)

export default router