import { Router } from 'express'

import * as controller from '../controllers/order.js'
import { protect } from '../middlewares/auth.js'
import validation from '../middlewares/validation.js'
import * as middleware from '../middlewares/order.js'
import * as order from '../validators/order.js'

const router = Router()

router.get('/', [ protect ], controller.getAllOrders)

router.get('/statistics', [ protect ], controller.getStatistics)

router.post('/', [ protect, validation(order.bodySchema),middleware.verifyProducts ], controller.createOrder)

router.get('/:id', [ protect, validation(order.paramSchema, 'params') ], controller.getOrder)

router.put('/:id', [ protect, validation(order.paramSchema, 'params'), validation(order.bodySchema) ], controller.updateOrder)

router.delete('/:id', [ protect, validation(order.paramSchema, 'params') ], controller.deleteOrder)

router.post("/:id/pay", [ protect, validation(order.paramSchema, 'params') ], controller.updateOrderPay)

router.post("/:id/delivery", [ protect, validation(order.paramSchema, 'params') ], controller.updateOrderDelivery)

export default router