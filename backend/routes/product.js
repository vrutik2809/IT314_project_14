import { Router } from 'express'

import * as controller from '../controllers/product.js'
import { protect } from '../middlewares/auth.js'
import validation from '../middlewares/validation.js'
import * as product from '../validators/product.js'

const router = Router()
