import { TAcademicFaculty } from './academicFaculty.interface';
import { AcademicFacultyModel } from './academicFaculty.model';

const createAcademicFacultyIntoDB = async (
  academicFacultyData: TAcademicFaculty,
) => {
  const result = await AcademicFacultyModel.create(academicFacultyData);

  return result;
};

const getallAcademicFacultyIntoDB = async () => {
  const result = await AcademicFacultyModel.find();
  return result;
};

const getSingleAcademicFacultyIntoDB = async (id: string) => {
  const result = await AcademicFacultyModel.findOne({ _id: id });
  return result;
};

const updateAcademicFacultyIntoDB = async (
  id: string,
  FacultyData: Partial<TAcademicFaculty>,
) => {
  const result = await AcademicFacultyModel.findByIdAndUpdate(id, FacultyData, {
    new: true,
  });
  return result;
};

export const AcademicFacultyServices = {
  createAcademicFacultyIntoDB,
  getSingleAcademicFacultyIntoDB,
  getallAcademicFacultyIntoDB,
  updateAcademicFacultyIntoDB,
};
