import express from 'express';
import { AcademicSemesterController } from './academicSemester.controller';
import validationRequest from '../../middlewares/validateRequest';
import { validationacademicSechmas } from './academicSemester.validation';

const router = express.Router();

router.post(
  '/createsemester',
  validationRequest(
    validationacademicSechmas.CreateAcademicSemesterValidationSchema,
  ),
  AcademicSemesterController.AcademicSemesterCreated,
);

router.patch(
  '/:semesterId',
  validationRequest(
    validationacademicSechmas.UpdateAcademicSemesterValidationSchema,
  ),
  AcademicSemesterController.UpdateSingleAcademicSemester,
);

router.get(
  '/:semesterId',
  AcademicSemesterController.getSingleAcademicSemester,
);

router.get('/', AcademicSemesterController.getAcademicSemester);

export const AcademicSemesterRoutes = router;
