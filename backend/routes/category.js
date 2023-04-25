import { Router } from 'express'

import * as controller from '../controllers/category.js'
import { protect } from '../middlewares/auth.js'
import validation from '../middlewares/validation.js'
import * as category from '../validators/category.js'

const router = Router()

router.get('/', [ protect ], controller.getAllCategories)

router.post('/', [ protect, validation(category.bodySchema) ], controller.createCategory)

router.get('/:id', [ protect, validation(category.paramSchema, 'params') ], controller.getCategory)

router.put('/:id', [ protect, validation(category.paramSchema, 'params'), validation(category.bodySchema) ], controller.updateCategory)

router.delete('/:id', [ protect, validation(category.paramSchema, 'params') ], controller.deleteCategory)

export default router