import config from '../../config';
import { AcademicSemesterModel } from '../academicSemester/academicSemester.model';
import { Student } from '../student/student.interface';
import { StudentModel } from '../student/student.model';
import { Tuser } from './user.interface';
import { User } from './user.model';
import { generateUserid } from './user.utils';

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

  userData.id = await generateUserid(addimisionsesmeter);

  const newUser = await User.create(userData);

  if (Object.keys(newUser).length) {
    studentData.id = newUser.id;
    studentData.user = newUser._id;

    const newStudent = await StudentModel.create(studentData);

    return newStudent;
  }
};

export const userServices = {
  createStudentIntoDB,
};
