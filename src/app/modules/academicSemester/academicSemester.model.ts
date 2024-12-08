import { model, Schema } from "mongoose";
import { TacademicSemester, } from "./academicSemester.interface";
import { AcademicSemestercode, AcademicSemestername, Months } from "./academicSemester.const";


const academicSemesterSchema = new Schema<TacademicSemester>({
    name: {
        type: String,
        enum: AcademicSemestername,
        required: true
    },
    year: {
        type: String,
        required: true
    },
    code: {
        type: String,
        enum: AcademicSemestercode,
        required: true
    },
    startMonth: {
        type: String,
        enum: Months,
        required: true
    },
    endMonth: {
        type: String,
        enum: Months,
        required: true
    }
},
    {
        timestamps: true
    })

academicSemesterSchema.pre('save', async function (next) {
    const isExistedSemister = await AcademicSemesterModel.findOne({
        name: this.name,
        year: this.year,
    })
    if (isExistedSemister) {
        throw new Error(`Semester is already exists !`)
    }
    next()
})

export const AcademicSemesterModel = model<TacademicSemester>('AcademicSemester', academicSemesterSchema);