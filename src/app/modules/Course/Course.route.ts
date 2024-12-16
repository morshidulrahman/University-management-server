import express from 'express';
import { CourseController } from './Course.controller';
import validationRequest from '../../middlewares/validateRequest';
import { courseValidation } from './Course.validation';

const router = express.Router();

router.get('/:courseId', CourseController.getSingleCourse);

router.get('/', CourseController.getAllCourses);

router.post(
  '/create-course',
  validationRequest(courseValidation.createCourseValidationSchema),
  CourseController.CoursesCreated,
);

router.patch(
  '/:courseId',
  validationRequest(courseValidation.UpdatedCourseValidationSchema),
  CourseController.UpdateSingleCourse,
);

router.delete('/:courseId', CourseController.DeleteSingleCourse);

export const CourseRouter = router;
