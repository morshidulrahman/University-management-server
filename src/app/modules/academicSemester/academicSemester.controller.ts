/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import SendResponse from '../../utils/SendResponse';
import { AcademicSemesterServices } from './academicSemester.service';

const AcademicSemesterCreated = catchAsync(async (req, res, next) => {
  const semisterData = req.body;
  const result =
    await AcademicSemesterServices.createAcademicSemesterIntoDB(semisterData);
  SendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'AcademicSemester created successfully',
    data: result,
  });
});

const getAcademicSemester = catchAsync(async (req, res, next) => {
  const result = await AcademicSemesterServices.getallAcademicSemesterIntoDB();
  SendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Academic semester is retrieved succesfully',
    data: result,
  });
});

const getSingleAcademicSemester = catchAsync(async (req, res, next) => {
  const { semesterId } = req.params;
  const result =
    await AcademicSemesterServices.getSingleAcademicSemesterIntoDB(semesterId);
  SendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Academic semester is retrieved succesfully',
    data: result,
  });
});

const UpdateSingleAcademicSemester = catchAsync(async (req, res, next) => {
  const { semesterId } = req.params;
  const updatedData = req.body;
  const result = await AcademicSemesterServices.updateAcademicSemesterIntoDB(
    semesterId,
    updatedData,
  );
  SendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Academic semester is updated succesfully',
    data: result,
  });
});

export const AcademicSemesterController = {
  AcademicSemesterCreated,
  getAcademicSemester,
  getSingleAcademicSemester,
  UpdateSingleAcademicSemester,
};
