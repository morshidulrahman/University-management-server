import { z } from 'zod';

export const CreateAcademicFacultyValidationSchema = z.object({
  body: z.object({
    name: z.string(),
  }),
});

export const UpdateAcademicFacultyValidationSchema = z.object({
  body: z.object({
    name: z.string().optional(),
  }),
});

export const validationacademicSechmas = {
  CreateAcademicFacultyValidationSchema,
  UpdateAcademicFacultyValidationSchema,
};
