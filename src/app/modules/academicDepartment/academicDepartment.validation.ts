import { z } from 'zod';

export const CreateAcademicDepartmentValidationSchema = z.object({
  body: z.object({
    name: z.string(),
  }),
});

export const UpdateAcademicDepartmentValidationSchema = z.object({
  body: z.object({
    name: z.string().optional(),
  }),
});

export const validationacademicDepartmentSechmas = {
  CreateAcademicDepartmentValidationSchema,
  UpdateAcademicDepartmentValidationSchema,
};
