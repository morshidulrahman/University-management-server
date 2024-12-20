import { Router } from 'express';
import { UsersRoutes } from '../modules/user/user.route';
import { StudentRoutes } from '../modules/student/student.route';
import { AcademicSemesterRoutes } from '../modules/academicSemester/academicSemester.route';
import { AcademicFacultyRoutes } from '../modules/academicFaculty/academicFaculty.route';
import { AcademicDepartmentRoutes } from '../modules/academicDepartment/academicDepartment.route';
import { AdminRoutes } from '../modules/Admin/admin.route';
import { CourseRouter } from '../modules/Course/Course.route';
import { FacultyRoutes } from '../modules/Faculty/Faculty.route';
import { semesterRegisterRouters } from '../modules/semesterRegistration/semesterRegistration.route';

const router = Router();

const midleRoutes = [
  {
    path: '/users',
    route: UsersRoutes,
  },
  {
    path: '/students',
    route: StudentRoutes,
  },
  {
    path: '/academic-semester',
    route: AcademicSemesterRoutes,
  },
  {
    path: '/academic-faculties',
    route: AcademicFacultyRoutes,
  },
  {
    path: '/academic-departments',
    route: AcademicDepartmentRoutes,
  },
  {
    path: '/admins',
    route: AdminRoutes,
  },
  {
    path: '/courses',
    route: CourseRouter,
  },
  {
    path: '/faculties',
    route: FacultyRoutes,
  },
  {
    path: '/semester-registrations',
    route: semesterRegisterRouters,
  },
];

midleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
