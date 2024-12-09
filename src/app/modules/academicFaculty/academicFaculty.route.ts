import express from 'express';
import validationRequest from '../../middlewares/validateRequest';
import { validationacademicFacultySechmas } from './academicFaculty.Validation';
import { AcademicFacultyController } from './academicFaculty.controller';

const router = express.Router();

router.post(
  '/create-faculty',
  validationRequest(
    validationacademicFacultySechmas.CreateAcademicFacultyValidationSchema,
  ),
  AcademicFacultyController.AcademicFacultyCreated,
);

router.patch(
  '/:FacultyId',
  validationRequest(
    validationacademicFacultySechmas.UpdateAcademicFacultyValidationSchema,
  ),
  AcademicFacultyController.UpdateSingleAcademicFaculty,
);

router.get('/:FacultyId', AcademicFacultyController.getSingleAcademicFaculty);

router.get('/', AcademicFacultyController.getAcademicFaculty);

export const AcademicFacultyRoutes = router;
