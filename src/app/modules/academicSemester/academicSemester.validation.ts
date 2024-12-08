import { z } from 'zod';
import {
  AcademicSemestercode,
  AcademicSemestername,
  Months,
} from './academicSemester.const';

export const CreateAcademicSemesterValidationSchema = z.object({
  body: z.object({
    name: z.enum([...AcademicSemestername] as [string, ...string[]]),
    year: z.string(),
    code: z.enum([...AcademicSemestercode] as [string, ...string[]]),
    startMonth: z.enum([...Months] as [string, ...string[]]),
    endMonth: z.enum([...Months] as [string, ...string[]]),
  }),
});

export const UpdateAcademicSemesterValidationSchema = z.object({
  body: z.object({
    name: z.enum([...AcademicSemestername] as [string, ...string[]]).optional(),
    year: z.string(),
    code: z.enum([...AcademicSemestercode] as [string, ...string[]]).optional(),
    startMonth: z.enum([...Months] as [string, ...string[]]).optional(),
    endMonth: z.enum([...Months] as [string, ...string[]]).optional(),
  }),
});

export const validationacademicSechmas = {
  CreateAcademicSemesterValidationSchema,
  UpdateAcademicSemesterValidationSchema,
};
