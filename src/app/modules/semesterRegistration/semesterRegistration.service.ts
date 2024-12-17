import { TSemesterRegistration } from './semesterRegistration.interface';
import { semesterRegisterModel } from './semesterRegistration.model';

const createSemesterRegisterintoDb = async (payload: TSemesterRegistration) => {
  const result = semesterRegisterModel.create(payload);
  return result;
};

const getSingleSemesterRegisterintoDb = async (id: string) => {
  const result = await semesterRegisterModel.findById(id);
  return result;
};

const getAllSemesterRegisterIntoDb = async () => {
  const result = await semesterRegisterModel.find();
  return result;
};

const updateSemesterRegisterintoDb = async (
  id: string,
  payload: Partial<TSemesterRegistration>,
) => {
  const result = await semesterRegisterModel.findByIdAndUpdate(id, payload, {
    new: true,
  });
  return result;
};

const deleteSemesterRegisterFromDb = async (id: string) => {
  const result = await semesterRegisterModel.findByIdAndDelete(id);
  return result;
};

export const semesterRegisterServices = {
  createSemesterRegisterintoDb,
  getSingleSemesterRegisterintoDb,
  getAllSemesterRegisterIntoDb,
  updateSemesterRegisterintoDb,
  deleteSemesterRegisterFromDb,
};
