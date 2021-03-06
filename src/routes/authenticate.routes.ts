import { Router } from 'express'

import { AuthenticateUserController } from '../controllers/AuthenticateUserController'

const authenticateRouter = Router()
const authenticateUserController = new AuthenticateUserController()

authenticateRouter.post('/', authenticateUserController.handle)

export { authenticateRouter }