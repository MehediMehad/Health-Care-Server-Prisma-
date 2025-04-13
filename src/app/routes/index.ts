import express from 'express'
import { UserRoutes } from '../modules/User/user.routes'
import { AdminRoutes } from '../modules/Admin/admin.routes'
import { AuthRouter } from '../modules/Auth/auth.route'

const router = express.Router()

const moduleRoutes = [
    {
        path: '/user',
        route: UserRoutes
    }, 
    {
        path: '/admin',
        route: AdminRoutes
    },
    {
        path: '/auth',
        route: AuthRouter
    }
]


moduleRoutes.forEach(route =>  router.use(route.path, route.route))

export default router