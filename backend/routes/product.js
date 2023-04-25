import { Router } from 'express'

import * as controller from '../controllers/product.js'
import { protect } from '../middlewares/auth.js'
import validation from '../middlewares/validation.js'
import * as product from '../validators/product.js'

const router = Router()

router.get('/', [ protect ], controller.getAllProducts)

router.post('/', [ protect, validation(product.bodySchema) ], controller.createProduct)

router.get('/:id', [ protect, validation(product.paramSchema, 'params') ], controller.getProduct)

router.put('/:id', [ protect, validation(product.paramSchema, 'params'), validation(product.bodySchema) ], controller.updateProduct)

router.delete('/:id', [ protect, validation(product.paramSchema, 'params') ], controller.deleteProduct)