import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import SendResponse from "../../utils/SendResponse";
import { AcademicSemesterServices } from "./academicSemester.service";


// eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
const AcademicSemesterCreated = catchAsync(async (req, res, next) => {

    const semisterData = req.body;
    const result = await AcademicSemesterServices.createAcademicSemesterIntoDB(semisterData);
    SendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: 'AcademicSemester created successfully',
        data: result
    })

}
)
export const AcademicSemesterController = {
    AcademicSemesterCreated
}