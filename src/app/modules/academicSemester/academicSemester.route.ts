
import express from 'express';
import { AcademicSemesterController } from './academicSemester.controller';
import validationRequest from '../../middlewares/validateRequest';
import { validationacademicSechmas } from './academicSemester.validation';

const router = express.Router();

router.post('/createsemester', validationRequest(validationacademicSechmas.CreateAcademicSemesterValidationSchema), AcademicSemesterController.AcademicSemesterCreated);


export const AcademicSemesterRoutes = router;