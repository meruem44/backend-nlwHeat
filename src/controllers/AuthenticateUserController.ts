import { Request, Response } from 'express'

import { AuthenticateUserService } from '../services/AuthenticateUserService'

class AuthenticateUserController {
    public async handle(request: Request, response: Response) {

        const { code } = request.body

        const authenticateUser = new AuthenticateUserService()

        const result = await authenticateUser.execute(code)
        
        return response.json(result)

    }
}

export { AuthenticateUserController }