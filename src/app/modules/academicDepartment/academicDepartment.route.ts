import express from 'express';
import validationRequest from '../../middlewares/validateRequest';
import { AcademicDepartmentController } from './academicDepartment.controller';
import { validationacademicDepartmentSechmas } from './academicDepartment.validation';

const router = express.Router();

router.post(
  '/create-academic-department',
  validationRequest(
    validationacademicDepartmentSechmas.CreateAcademicDepartmentValidationSchema,
  ),
  AcademicDepartmentController.AcademicDepartmentCreated,
);

router.patch(
  '/:departmentId',
  validationRequest(
    validationacademicDepartmentSechmas.UpdateAcademicDepartmentValidationSchema,
  ),
  AcademicDepartmentController.UpdateSingleAcademicDepartment,
);

router.get(
  '/:departmentId',
  AcademicDepartmentController.getSingleAcademicDepartment,
);

router.get('/', AcademicDepartmentController.getAcademicDepartment);

export const AcademicDepartmentRoutes = router;
