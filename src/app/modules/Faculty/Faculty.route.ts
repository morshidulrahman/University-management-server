import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { FacultyControllers } from './Faculty.controller';
import { updateFacultyValidationSchema } from './Faculty.validation';

const router = express.Router();

router.get('/:id', FacultyControllers.getSingleFaculty);

router.patch(
  '/:id',
  validateRequest(updateFacultyValidationSchema),
  FacultyControllers.updateFaculty,
);

router.delete('/:id', FacultyControllers.deleteFaculty);

router.get('/', FacultyControllers.getAllFaculties);
router.post('/create-faculty', FacultyControllers.CreateFaculty);

export const FacultyRoutes = router;
