import { academicSemesterCodeandNameMaper } from "./academicSemester.const";
import { TacademicSemester } from "./academicSemester.interface";
import { AcademicSemesterModel } from "./academicSemester.model";




const createAcademicSemesterIntoDB = async (academicData: TacademicSemester) => {

    if (academicSemesterCodeandNameMaper[academicData.name] !== academicData.code) {
        throw new Error('invalid semister code and name')
    }
    const result = await AcademicSemesterModel.create(academicData)

    return result

};


export const AcademicSemesterServices = {
    createAcademicSemesterIntoDB
}