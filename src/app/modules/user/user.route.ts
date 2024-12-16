import express from 'express';
import { userController } from './user.controller';
import { CreatestudentValidationSchema } from '../student/student.validation';

import validationRequest from '../../middlewares/validateRequest';
import { createAdminValidationSchema } from '../Admin/admin.validation';
const router = express.Router();

router.post(
  '/create-student',
  validationRequest(CreatestudentValidationSchema),
  userController.createStudent,
);

router.post(
  '/create-admin',
  validationRequest(createAdminValidationSchema),
  userController.createAdmin,
);

export const UsersRoutes = router;
