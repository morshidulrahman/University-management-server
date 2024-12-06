
import { NextFunction, Request, RequestHandler, Response } from "express";
import { userServices } from "./user.service";
import SendResponse from "../../utils/SendResponse";
import httpStatus from "http-status";




const catchAsync = (fn: RequestHandler) => {
    return (req: Request, res: Response, next: NextFunction) => {
        Promise.resolve(fn(req, res, next)).catch(err => next(err))
    }
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
const createStudent = catchAsync(async (req, res, next) => {

    const { password, student: studentData } = req.body;
    const result = await userServices.createStudentIntoDB(password, studentData);

    SendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: 'Student created successfully',
        data: result
    })

}
)
export const userController = {
    createStudent
}