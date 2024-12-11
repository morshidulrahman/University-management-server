import httpStatus from 'http-status';
import config from '../../config';

import { AcademicSemesterModel } from '../academicSemester/academicSemester.model';
import { Student } from '../student/student.interface';
import { StudentModel } from '../student/student.model';
import { Tuser } from './user.interface';
import { User } from './user.model';
import { generateUserid } from './user.utils';
import mongoose from 'mongoose';

const createStudentIntoDB = async (password: string, studentData: Student) => {
  const userData: Partial<Tuser> = {};

  userData.password = password || (config.default_password as string);

  userData.role = 'student';

  const addimisionsesmeter = await AcademicSemesterModel.findById(
    studentData.admissionSemester,
  );
  if (!addimisionsesmeter) {
    throw new Error('Admission Semester not found');
  }

  const session = await mongoose.startSession();
  try {
    session.startTransaction();

    userData.id = await generateUserid(addimisionsesmeter);

    const newUser = await User.create([userData], { session });

    if (!newUser.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create user');
    }

    if (newUser.length) {
      studentData.id = newUser[0].id;
      studentData.user = newUser[0]._id;

      const newStudent = await StudentModel.create([studentData], { session });

      if (!newStudent.length) {
        throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create student');
      }

      await session.commitTransaction();
      await session.endSession();

      return newStudent;
    }
  } catch (err) {
    await session.abortTransaction();
    await session.endSession();

    throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create student');
  }
};

export const userServices = {
  createStudentIntoDB,
};
