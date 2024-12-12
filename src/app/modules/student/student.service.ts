import httpStatus from 'http-status';
import AppError from '../../errors/Apperror';
import { StudentModel } from './student.model';
import mongoose from 'mongoose';
import { User } from '../user/user.model';
import { Student } from './student.interface';

const getAllStudentsFromDB = async (query: Record<string, unknown>) => {
  let searchTerm = '';
  const queryobj = { ...query };
  if (query?.searchTerm) {
    searchTerm = query.searchTerm as string;
  }

  const searchQuery = StudentModel.find({
    $or: ['email', 'name.firstName', 'presentAddress'].map((field) => ({
      [field]: { $regex: searchTerm, $options: 'i' },
    })),
  });

  // HOW OUR FORMAT SHOULD BE FOR PARTIAL MATCH  :
  //  { email: { $regex : query.searchTerm , $options: i}}
  //  { presentAddress: { $regex : query.searchTerm , $options: i}}
  //  { 'name.firstName': { $regex : query.searchTerm , $options: i}}

  const excludedField = ['searchTerm', 'sort', 'limit', 'fields', 'page'];

  excludedField.forEach((el) => delete queryobj[el]);

  const filterQuery = searchQuery
    .find(queryobj)
    .populate('admissionSemester')
    .populate({
      path: 'academicDepartment',
      populate: { path: 'academicFaculty' },
    });

  let sort = '-createdAt';
  if (query.sort) {
    sort = query.sort as string;
  }

  const sortQuery = filterQuery.sort(sort);

  let page = 1; // SET DEFAULT VALUE FOR PAGE
  let limit = 1; // SET DEFAULT VALUE FOR LIMIT
  let skip = 0; // SET DEFAULT VALUE FOR SKIP

  if (query.limit) {
    limit = Number(query.limit);
  }

  if (query.page) {
    page = Number(query.page);
    skip = (page - 1) * limit;
  }

  const paginateQuery = sortQuery.skip(skip);

  const limitQuery = paginateQuery.limit(limit);

  // FIELDS LIMITING FUNCTIONALITY:
  // HOW OUR FORMAT SHOULD BE FOR PARTIAL MATCH

  let fields = '-__v'; // SET DEFAULT VALUE

  if (query.fields) {
    fields = (query.fields as string).split(',').join(' ');
  }

  const feildQuery = await limitQuery.select(fields);

  return feildQuery;
};

const getSingleStudentFromDB = async (id: string) => {
  const result = await StudentModel.findOne({ id })
    .populate('admissionSemester')
    .populate({
      path: 'academicDepartment',
      populate: { path: 'academicFaculty' },
    });
  return result;
};

const deleteStudentFromDB = async (id: string) => {
  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const deletStudent = await StudentModel.findOneAndUpdate(
      { id },
      { isDeleted: true },
      {
        new: true,
        session,
      },
    );
    if (!deletStudent) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed delete a student');
    }

    const deletedUser = await User.findOneAndUpdate(
      { id },
      { isDeleted: true },
      {
        new: true,
        session,
      },
    );
    if (!deletedUser) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed delete a user');
    }
    await session.commitTransaction();
    await session.endSession();
    return deletStudent;
  } catch (err) {
    await session.abortTransaction();
    await session.endSession();
    throw new AppError(httpStatus.BAD_REQUEST, 'Failed delete a student');
  }
};

const updateStudentIntoDB = async (id: string, payload: Partial<Student>) => {
  const { name, guardian, localGuardian, ...remainingStudentData } = payload;

  const modifiedUpdatedData: Record<string, unknown> = {
    ...remainingStudentData,
  };

  if (name && Object.keys(name).length) {
    for (const [key, value] of Object.entries(name)) {
      modifiedUpdatedData[`name.${key}`] = value;
    }
  }

  if (guardian && Object.keys(guardian).length) {
    for (const [key, value] of Object.entries(guardian)) {
      modifiedUpdatedData[`guardian.${key}`] = value;
    }
  }

  if (localGuardian && Object.keys(localGuardian).length) {
    for (const [key, value] of Object.entries(localGuardian)) {
      modifiedUpdatedData[`localGuardian.${key}`] = value;
    }
  }

  const result = await StudentModel.findOneAndUpdate(
    { id },
    modifiedUpdatedData,
    {
      new: true,
      runValidators: true,
    },
  );
  return result;
};

export const StudentServices = {
  getAllStudentsFromDB,
  getSingleStudentFromDB,
  deleteStudentFromDB,
  updateStudentIntoDB,
};
