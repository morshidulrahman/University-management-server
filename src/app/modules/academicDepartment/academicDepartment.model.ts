import { model, Schema } from 'mongoose';
import { TacamedemiDep } from './academicDepartment.interface';

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

export const AcademicDepartmentModel = model<TacamedemiDep>(
  'academicDepartment',
  academicDepartmentSchema,
);
