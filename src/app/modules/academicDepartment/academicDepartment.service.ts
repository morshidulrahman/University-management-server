import { TacamedemiDep } from './academicDepartment.interface';
import { AcademicDepartmentModel } from './academicDepartment.model';

const createAcademicDepartmentIntoDB = async (
  academicDepartmentData: TacamedemiDep,
) => {
  const result = await AcademicDepartmentModel.create(academicDepartmentData);

  return result;
};

const getallAcademicDepartmentIntoDB = async () => {
  const result = await AcademicDepartmentModel.find();
  return result;
};

const getSingleAcademicDepartmentIntoDB = async (id: string) => {
  const result = await AcademicDepartmentModel.findOne({ _id: id });
  return result;
};

const updateAcademicDepartmentIntoDB = async (
  id: string,
  Depdata: Partial<TacamedemiDep>,
) => {
  const result = await AcademicDepartmentModel.findByIdAndUpdate(id, Depdata, {
    new: true,
  });
  return result;
};

export const AcademicDepartmentServices = {
  createAcademicDepartmentIntoDB,
  getSingleAcademicDepartmentIntoDB,
  getallAcademicDepartmentIntoDB,
  updateAcademicDepartmentIntoDB,
};
