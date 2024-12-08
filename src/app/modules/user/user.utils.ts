import { TacademicSemester } from '../academicSemester/academicSemester.interface';
import { User } from './user.model';

const findlastuser = async () => {
  const laststudent = await User.findOne(
    {
      role: 'student',
    },
    {
      id: 1,
      _id: 0,
    },
  )
    .sort({
      createdAt: -1,
    })
    .lean();
  //2030 01 0001
  return laststudent?.id ? laststudent.id : undefined;
};

export const generateUserid = async (payload: TacademicSemester) => {
  let currentId = (0).toString();

  const laststudentid = await findlastuser();

  const laststudentsemesterCode = laststudentid?.substring(4, 6); //01
  const laststudentyear = laststudentid?.substring(0, 4); //2030
  const currentstudentyear = payload.year;
  const currentstudentCode = payload.code;

  if (
    laststudentid &&
    laststudentyear === currentstudentyear &&
    laststudentsemesterCode === currentstudentCode
  ) {
    currentId = laststudentid?.substring(6);
  }

  let incrementId = (Number(currentId) + 1).toString().padStart(4, '0');

  incrementId = `${payload.year}${payload.code}${incrementId}`;

  return incrementId;
};
