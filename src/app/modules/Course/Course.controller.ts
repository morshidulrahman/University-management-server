/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import SendResponse from '../../utils/SendResponse';
import { CourseServices } from './Course.service';

const CoursesCreated = catchAsync(async (req, res, next) => {
  const CourseData = req.body;
  const result = await CourseServices.CreateCourseIntoDB(CourseData);
  SendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Course created successfully',
    data: result,
  });
});

const getAllCourses = catchAsync(async (req, res, next) => {
  const result = await CourseServices.getAllCourseIntoDB();
  SendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Course is retrieved succesfully',
    data: result,
  });
});

const getSingleCourse = catchAsync(async (req, res, next) => {
  const { courseId } = req.params;
  const result = await CourseServices.getSingleCourseIntoDB(courseId);
  SendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Course is retrieved succesfully',
    data: result,
  });
});

const UpdateSingleCourse = catchAsync(async (req, res, next) => {
  const { courseId } = req.params;
  const updatedData = req.body;
  const result = await CourseServices.updateCourseIntoDB(courseId, updatedData);
  SendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Course is updated succesfully',
    data: result,
  });
});

const DeleteSingleCourse = catchAsync(async (req, res, next) => {
  const { courseId } = req.params;

  const result = await CourseServices.DeletedCourseIntoDB(courseId);
  SendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Course is Deleted succesfully',
    data: result,
  });
});

const assignFacultiesWithCourse = catchAsync(async (req, res) => {
  const { courseId } = req.params;
  const { faculties } = req.body;

  const result = await CourseServices.assignFacultiesWithCourseIntoDB(
    courseId,
    faculties,
  );

  SendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Faculties assigned  succesfully',
    data: result,
  });
});

const removeFacultiesFromCourse = catchAsync(async (req, res) => {
  const { courseId } = req.params;
  const { faculties } = req.body;

  const result = await CourseServices.removeFacultiesFromCourseFromDB(
    courseId,
    faculties,
  );

  SendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Faculties removed  succesfully',
    data: result,
  });
});

export const CourseController = {
  CoursesCreated,
  getAllCourses,
  getSingleCourse,
  UpdateSingleCourse,
  DeleteSingleCourse,
  assignFacultiesWithCourse,
  removeFacultiesFromCourse,
};
