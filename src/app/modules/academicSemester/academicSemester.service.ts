import { academicSemesterCodeandNameMaper } from './academicSemester.const';
import { TacademicSemester } from './academicSemester.interface';
import { AcademicSemesterModel } from './academicSemester.model';

const createAcademicSemesterIntoDB = async (
  academicData: TacademicSemester,
) => {
  if (
    academicSemesterCodeandNameMaper[academicData.name] !== academicData.code
  ) {
    throw new Error('invalid semister code and name');
  }
  const result = await AcademicSemesterModel.create(academicData);

  return result;
};

const getallAcademicSemesterIntoDB = async () => {
  const result = await AcademicSemesterModel.find();
  return result;
};

const getSingleAcademicSemesterIntoDB = async (id: string) => {
  const result = await AcademicSemesterModel.findOne({ _id: id });
  return result;
};

const updateAcademicSemesterIntoDB = async (
  id: string,
  academicData: Partial<TacademicSemester>,
) => {
  if (
    academicData.name &&
    academicData.code &&
    academicSemesterCodeandNameMaper[academicData.name] !== academicData.code
  ) {
    throw new Error('invalid semister code and name');
  }
  const result = await AcademicSemesterModel.findByIdAndUpdate(
    id,
    academicData,
    { new: true },
  );
  return result;
};

export const AcademicSemesterServices = {
  createAcademicSemesterIntoDB,
  getSingleAcademicSemesterIntoDB,
  getallAcademicSemesterIntoDB,
  updateAcademicSemesterIntoDB,
};
