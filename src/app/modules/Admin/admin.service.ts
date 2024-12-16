import httpStatus from 'http-status';
import AppError from '../../errors/Apperror';

import mongoose from 'mongoose';
import { User } from '../user/user.model';

import QueryBuilder from '../builder/builder';
import { AdminSearchableFields } from './admin.constant';
import { AdminModel } from './admin.model';
import { TAdmin } from './admin.interface';

const getAllAdminFromDB = async (query: Record<string, unknown>) => {
  // return feildQuery;
  const adminquery = new QueryBuilder(AdminModel.find(), query)
    .search(AdminSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await adminquery.modelQuery;

  return result;
};

const getSingleAdminFromDB = async (id: string) => {
  const result = await AdminModel.findOne({ id })
    .populate('admissionSemester')
    .populate({
      path: 'academicDepartment',
      populate: { path: 'academicFaculty' },
    });
  return result;
};

const deleteAdminFromDB = async (id: string) => {
  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const deletAdmin = await AdminModel.findOneAndUpdate(
      { id },
      { isDeleted: true },
      {
        new: true,
        session,
      },
    );
    if (!deletAdmin) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed delete a Admin');
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
    return deletAdmin;
  } catch (err) {
    await session.abortTransaction();
    await session.endSession();
    throw new AppError(httpStatus.BAD_REQUEST, 'Failed delete a Admin');
  }
};

const updateAdminIntoDB = async (id: string, payload: Partial<TAdmin>) => {
  const { name, ...remainingAdminData } = payload;

  const modifiedUpdatedData: Record<string, unknown> = {
    ...remainingAdminData,
  };

  if (name && Object.keys(name).length) {
    for (const [key, value] of Object.entries(name)) {
      modifiedUpdatedData[`name.${key}`] = value;
    }
  }

  const result = await AdminModel.findOneAndUpdate(
    { id },
    modifiedUpdatedData,
    {
      new: true,
      runValidators: true,
    },
  );
  return result;
};

export const AdminServices = {
  getAllAdminFromDB,
  getSingleAdminFromDB,
  deleteAdminFromDB,
  updateAdminIntoDB,
};
