import { TCourse } from './Course.interface';
import { CourseModel } from './Course.model';

const CreateCourseIntoDB = async (payload: TCourse) => {
  const result = await CourseModel.create(payload);
  return result;
};

const getSingleCourseIntoDB = async (id: string) => {
  const result = await CourseModel.findById(id);
  return result;
};

const getAllCourseIntoDB = async () => {
  const result = await CourseModel.find();
  return result;
};

const updateCourseIntoDB = async (id: string, payload: TCourse) => {
  const result = await CourseModel.findByIdAndUpdate(id, payload, {
    new: true,
  });
  return result;
};

const DeletedCourseIntoDB = async (id: string) => {
  const result = await CourseModel.findByIdAndUpdate(
    id,
    { isDeleted: true },
    { new: true },
  );
  return result;
};

export const CourseServices = {
  CreateCourseIntoDB,
  getSingleCourseIntoDB,
  getAllCourseIntoDB,
  updateCourseIntoDB,
  DeletedCourseIntoDB,
};
