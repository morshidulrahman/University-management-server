/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import SendResponse from '../../utils/SendResponse';
import { AcademicDepartmentServices } from './academicDepartment.service';

const AcademicDepartmentCreated = catchAsync(async (req, res, next) => {
  const DepartmentData = req.body;
  const result =
    await AcademicDepartmentServices.createAcademicDepartmentIntoDB(
      DepartmentData,
    );
  SendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'AcademicDepartment created successfully',
    data: result,
  });
});

const getAcademicDepartment = catchAsync(async (req, res, next) => {
  const result =
    await AcademicDepartmentServices.getallAcademicDepartmentIntoDB();
  SendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Academic Department is retrieved succesfully',
    data: result,
  });
});

const getSingleAcademicDepartment = catchAsync(async (req, res, next) => {
  const { departmentId } = req.params;
  const result =
    await AcademicDepartmentServices.getSingleAcademicDepartmentIntoDB(
      departmentId,
    );
  SendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Academic Department is retrieved succesfully',
    data: result,
  });
});

const UpdateSingleAcademicDepartment = catchAsync(async (req, res, next) => {
  const { departmentId } = req.params;
  const updatedData = req.body;
  const result =
    await AcademicDepartmentServices.updateAcademicDepartmentIntoDB(
      departmentId,
      updatedData,
    );
  SendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Academic Department is updated succesfully',
    data: result,
  });
});

export const AcademicDepartmentController = {
  AcademicDepartmentCreated,
  getAcademicDepartment,
  getSingleAcademicDepartment,
  UpdateSingleAcademicDepartment,
};
