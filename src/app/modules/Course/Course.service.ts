import httpStatus from 'http-status';
import AppError from '../../errors/Apperror';
import { TCourse, TCoursefaculty } from './Course.interface';
import { CourseFaculty, CourseModel } from './Course.model';
import mongoose from 'mongoose';

const CreateCourseIntoDB = async (payload: TCourse) => {
  const result = await CourseModel.create(payload);
  return result;
};

const getSingleCourseIntoDB = async (id: string) => {
  const result = await CourseModel.findById(id).populate(
    'preRequisiteCourses.course',
  );
  return result;
};

const getAllCourseIntoDB = async () => {
  const result = await CourseModel.find().populate(
    'preRequisiteCourses.course',
  );
  return result;
};

const updateCourseIntoDB = async (id: string, payload: TCourse) => {
  const { preRequisiteCourses, ...courseRemainingData } = payload;

  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const updateCourse = await CourseModel.findByIdAndUpdate(
      id,
      courseRemainingData,
      {
        new: true,
      },
    );

    if (!updateCourse) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to update courses');
    }

    if (preRequisiteCourses && preRequisiteCourses.length > 0) {
      // deleted prerequisites
      const deletedprequisites = preRequisiteCourses
        .filter((el) => el.course && el.isDeleted)
        .map((el) => el.course);

      const deletedprequisitescourse = CourseModel.findByIdAndUpdate(id, {
        $pull: { preRequisiteCourses: { course: { $in: deletedprequisites } } },
      });

      if (!deletedprequisitescourse) {
        throw new AppError(
          httpStatus.BAD_REQUEST,
          'Failed to delete pre-requisites',
        );
      }

      const newCourses = preRequisiteCourses.filter(
        (el) => el.course && !el.isDeleted,
      );

      const newpreqisitescourses = CourseModel.findByIdAndUpdate(id, {
        $addToSet: { preRequisiteCourses: { $each: newCourses } },
      });

      if (!newpreqisitescourses) {
        throw new AppError(httpStatus.BAD_REQUEST, 'Failed to course remove');
      }
    }

    await session.commitTransaction();
    await session.endSession();

    const result = await CourseModel.findById(id).populate(
      'preRequisiteCourses.course',
    );

    return result;
  } catch (err) {
    await session.abortTransaction();
    await session.endSession();
    throw new AppError(httpStatus.BAD_REQUEST, 'Failed to update courses');
  }
};

const DeletedCourseIntoDB = async (id: string) => {
  const result = await CourseModel.findByIdAndUpdate(
    id,
    { isDeleted: true },
    { new: true },
  );
  return result;
};

const assignFacultiesWithCourseIntoDB = async (
  id: string,
  payload: Partial<TCoursefaculty>,
) => {
  const result = await CourseFaculty.findByIdAndUpdate(
    id,
    {
      course: id,
      $addToSet: { faculties: { $each: payload } },
    },
    {
      upsert: true,
      new: true,
    },
  );
  return result;
};

const removeFacultiesFromCourseFromDB = async (
  id: string,
  payload: Partial<TCoursefaculty>,
) => {
  const result = await CourseFaculty.findByIdAndUpdate(
    id,
    {
      $pull: { faculties: { $in: payload } },
    },
    {
      new: true,
    },
  );
  return result;
};

export const CourseServices = {
  CreateCourseIntoDB,
  getSingleCourseIntoDB,
  getAllCourseIntoDB,
  updateCourseIntoDB,
  DeletedCourseIntoDB,
  assignFacultiesWithCourseIntoDB,
  removeFacultiesFromCourseFromDB,
};
