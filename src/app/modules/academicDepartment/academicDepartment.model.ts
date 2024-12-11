import { model, Schema } from 'mongoose';
import { TacamedemiDep } from './academicDepartment.interface';
import AppError from '../../errors/Apperror';
import httpStatus from 'http-status';

const academicDepartmentSchema = new Schema<TacamedemiDep>(
  {
    name: { type: String, required: true, unique: true },
    academicFaculty: {
      type: Schema.Types.ObjectId,
      ref: 'AcademicFaculty',
    },
  },
  {
    timestamps: true,
  },
);

academicDepartmentSchema.pre('save', async function (next) {
  const departmentExists = await AcademicDepartmentModel.findOne({
    name: this.name,
  });
  if (departmentExists) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      'Academic department already exists!',
    );
  }
  next();
});

academicDepartmentSchema.pre('findOneAndUpdate', async function (next) {
  const query = this.getQuery();
  const departmentExists = await AcademicDepartmentModel.findOne(query);

  if (!departmentExists) {
    throw new AppError(httpStatus.NOT_FOUND, 'Academic department not found!');
  }
  next();
});

export const AcademicDepartmentModel = model<TacamedemiDep>(
  'academicDepartment',
  academicDepartmentSchema,
);
