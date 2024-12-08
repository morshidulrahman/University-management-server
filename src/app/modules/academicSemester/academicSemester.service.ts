import { TacademicSemester } from "./academicSemester.interface";
import { AcademicSemesterModel } from "./academicSemester.model";




const createAcademicSemesterIntoDB = async (academicData: TacademicSemester) => {

    const result = await AcademicSemesterModel.create(academicData)

    return result

};


export const AcademicSemesterServices = {
    createAcademicSemesterIntoDB
}