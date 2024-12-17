import { model, Schema } from 'mongoose';
import {
  TCourse,
  TCoursefaculty,
  TPreRequisiteCourses,
} from './Course.interface';

const TPreRequisiteCoursesSchema = new Schema<TPreRequisiteCourses>({
  course: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'Course',
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
});

const CoursesSchema = new Schema<TCourse>({
  title: { type: String, required: true },
  prefix: { type: String, required: true },
  code: { type: Number, required: true },
  credits: { type: Number, required: true },
  isDeleted: { type: Boolean, default: false },
  preRequisiteCourses: [TPreRequisiteCoursesSchema],
});

export const CourseModel = model<TCourse>('Course', CoursesSchema);

const courseFacultySchema = new Schema<TCoursefaculty>({
  course: {
    type: Schema.Types.ObjectId,
    ref: 'Course',
    unique: true,
  },
  faculties: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Faculty',
    },
  ],
});

export const CourseFaculty = model<TCoursefaculty>(
  'CourseFaculty',
  courseFacultySchema,
);
