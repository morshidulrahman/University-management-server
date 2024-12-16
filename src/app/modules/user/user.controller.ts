import { userServices } from './user.service';
import SendResponse from '../../utils/SendResponse';
import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';

// eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
const createStudent = catchAsync(async (req, res, next) => {
  const { password, student: studentData } = req.body;
  const result = await userServices.createStudentIntoDB(password, studentData);

  SendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Student created successfully',
    data: result,
  });
});

const createAdmin = catchAsync(async (req, res, next) => {
  const { password, admin: adminData } = req.body;
  const result = await userServices.createAdminIntoDB(password, adminData);

  SendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Admin created successfully',
    data: result,
  });
});

export const userController = {
  createStudent,
  createAdmin,
};
