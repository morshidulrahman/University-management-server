import express from 'express';
import { semesterRegisterController } from './semesterRegistration.controller';
const router = express.Router();

//Importing the controller

router.post(
  '/create-semesRegistration',
  semesterRegisterController.CoursesCreated,
);
router.get('/', semesterRegisterController.getAllSemesterRegister);

router.get(
  '/:registerId',
  semesterRegisterController.getSingleSemesterRegister,
);

export const semesterRegisterRouters = router;
