import express from 'express';
import { CourseController } from './Course.controller';

const router = express.Router();

router.post('/create-course', CourseController.CoursesCreated);

export const CourseRouter = router;
