import { Router } from 'express'

import { protect, admin } from '../middlewares/auth.js'
import * as controller from '../controllers/users.js'

const router = Router()

router.post('/', controller.createUser)

router.put('/profile/:id', [ protect ], controller.updateUser)

router.get('/:id', [ protect ], controller.getUser)

router.delete('/:id', [ protect, admin ], controller.deleteUser)

export default router