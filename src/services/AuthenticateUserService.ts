import axios from 'axios'
import { prismaClient } from '../prisma'
import { sign } from 'jsonwebtoken'
import { User } from '.prisma/client'

interface IAccessTokenResponse {
    access_token: string;
}

interface IUserResponse {
    avatar_url: string;
    login: string;
    id: number;
    name: string;

}

interface IResponse {
    token: string;
    user: User
}

class AuthenticateUserService {
    public async execute(code: string): Promise<IResponse> {
        const url = 'https://github.com/login/oauth/access_token'

        const { data: { access_token } } = await axios.post<IAccessTokenResponse>(url, null, {
            params: {
                client_id: process.env.GITHUB_CLIENT_ID,
                client_secret: process.env.GITHUB_CLIENTE_SECRET,
                code
            },
            headers: {
                "Accept": "application/json"
            }
        })

       const { data: { login, id, avatar_url, name } } = await axios.get<IUserResponse>('https://api.github.com/user', {
           headers: {
               authorization: `Bearer ${access_token}`
           }
       })

       let user = await prismaClient.user.findFirst({
           where: {
               github_id: id,
           }
       })

       if (!user) {
          user = await prismaClient.user.create({
               data: {
                   avatar_url,
                   name,
                   login,
                   github_id: id
               }
           })
       }

       const token = sign({
           user: {
               name: user.name,
               avatar_url: user.avatar_url,
               id: user.id
           }
       }, process.env.JWT_SECRET, { subject: user.id, expiresIn: '1d' })

       return {
           token,
           user
       }

    }
}

export { AuthenticateUserService }