import { model, Schema } from 'mongoose';
import { TSemesterRegistration } from './semesterRegistration.interface';

const semesterRegisterSchema = new Schema<TSemesterRegistration>({
  academicSemester: {
    type: Schema.Types.ObjectId,
    ref: 'AcademicSemester',
    required: true,
  },
  status: {
    type: String,
    enum: ['UPCOMING', 'ONGOING', 'ENDED'],
    required: true,
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
  minCredit: {
    type: Number,
    required: true,
    default: 3,
  },
});

export const semesterRegisterModel = model<TSemesterRegistration>(
  'semesterRegister',
  semesterRegisterSchema,
);
