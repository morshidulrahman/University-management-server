/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */

import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import SendResponse from '../../utils/SendResponse';
import { semesterRegisterServices } from './semesterRegistration.service';

const CoursesCreated = catchAsync(async (req, res, next) => {
  const CourseData = req.body;
  const result =
    await semesterRegisterServices.createSemesterRegisterintoDb(CourseData);
  SendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'SemesterRegister created successfully',
    data: result,
  });
});

const getSingleSemesterRegister = catchAsync(async (req, res, next) => {
  const { registerId } = req.params;
  const result =
    await semesterRegisterServices.getSingleSemesterRegisterintoDb(registerId);
  SendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'SemesterRegister retrived successfully',
    data: result,
  });
});
const getAllSemesterRegister = catchAsync(async (req, res, next) => {
  const result = await semesterRegisterServices.getAllSemesterRegisterIntoDb();
  SendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'SemesterRegister retrived successfully',
    data: result,
  });
});

export const semesterRegisterController = {
  CoursesCreated,
  getSingleSemesterRegister,
  getAllSemesterRegister,
};
