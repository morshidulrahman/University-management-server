import { Router } from "express";
import { UsersRoutes } from "../modules/user/user.route";
import { StudentRoutes } from "../modules/student/student.route";

const router = Router()


const midleRoutes = [
    {
        path: '/users',
        route: UsersRoutes
    },
    {
        path: '/students',
        route: StudentRoutes
    }
]

midleRoutes.forEach(route => router.use(route.path, route.route))




export default router