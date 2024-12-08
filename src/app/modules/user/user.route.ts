import express from 'express'
import { userController } from './user.controller';
import { CreatestudentValidationSchema } from '../student/student.validation';

import validationRequest from '../../middlewares/validateRequest';
const router = express.Router()

router.post("/create-student", validationRequest(CreatestudentValidationSchema), userController.createStudent)


export const UsersRoutes = router;