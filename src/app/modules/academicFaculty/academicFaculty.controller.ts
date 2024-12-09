/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import SendResponse from '../../utils/SendResponse';
import { AcademicFacultyServices } from './academicFaculty.service';

const AcademicFacultyCreated = catchAsync(async (req, res, next) => {
  const FacultyData = req.body;
  const result =
    await AcademicFacultyServices.createAcademicFacultyIntoDB(FacultyData);
  SendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'AcademicFaculty created successfully',
    data: result,
  });
});

const getAcademicFaculty = catchAsync(async (req, res, next) => {
  const result = await AcademicFacultyServices.getallAcademicFacultyIntoDB();
  SendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Academic Faculty is retrieved succesfully',
    data: result,
  });
});

const getSingleAcademicFaculty = catchAsync(async (req, res, next) => {
  const { FacultyId } = req.params;
  const result =
    await AcademicFacultyServices.getSingleAcademicFacultyIntoDB(FacultyId);
  SendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Academic Faculty is retrieved succesfully',
    data: result,
  });
});

const UpdateSingleAcademicFaculty = catchAsync(async (req, res, next) => {
  const { FacultyId } = req.params;
  const updatedData = req.body;
  const result = await AcademicFacultyServices.updateAcademicFacultyIntoDB(
    FacultyId,
    updatedData,
  );
  SendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Academic Faculty is updated succesfully',
    data: result,
  });
});

export const AcademicFacultyController = {
  AcademicFacultyCreated,
  getAcademicFaculty,
  getSingleAcademicFaculty,
  UpdateSingleAcademicFaculty,
};
