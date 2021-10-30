import { Router } from 'express'

const oauthRoutes = Router()

oauthRoutes.get('/github', (request, response) => {
    response.redirect(`https://github.com/login/oauth/authorize?client_id=${process.env.GITHUB_CLIENT_ID}`)
})

oauthRoutes.get('/signin/callback', (request, response) => {
    const { code } = request.query

    return response.json(code)
})

export { oauthRoutes }