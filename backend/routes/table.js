import { Router } from 'express'

import * as controller from '../controllers/table.js'
import { protect } from '../middlewares/auth.js'
import validation from '../middlewares/validation.js'
import * as table from '../validators/table.js'

const router = Router()

router.get('/', [ protect ], controller.getAllTables)

router.post('/', [ protect, validation(table.bodySchema) ], controller.createTable)

// TODO - add GET /all route
router.get('/all', [ protect ], controller.getTables)

router.get('/:id', [ protect, validation(table.paramSchema, 'params') ], controller.getTable)

router.put('/:id', [ protect, validation(table.paramSchema, 'params'), validation(table.bodySchema) ], controller.updateTable)

router.delete('/:id', [ protect, validation(table.paramSchema, 'params') ], controller.deleteTable)

export default router