import { Router } from 'express'

import * as controller from '../controllers/auth.js'
import validate from '../middlewares/validation.js'
import * as auth from '../validators/auth.js'

const router = Router()

router.post('/login',[ validate(auth.bodySchema) ],controller.login)

export default router