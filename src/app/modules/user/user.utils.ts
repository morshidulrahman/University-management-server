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

  return laststudent?.id ? laststudent.id.substring(6) : undefined;
};

export const generateUserid = async (payload: TacademicSemester) => {
  ///
  const currentId = (await findlastuser()) || (0).toString();

  let incrementId = (Number(currentId) + 1).toString().padStart(4, '0');

  incrementId = `${payload.year}${payload.code}${incrementId}`;

  return incrementId;
};
