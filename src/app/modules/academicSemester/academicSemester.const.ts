import { AcademicSemesterNameandCode, TAcademicSemesterCode, TAcademicSemesterName, TMonths } from "./academicSemester.interface";



export const Months: TMonths[] = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
];


export const AcademicSemestername: TAcademicSemesterName[] = ['Autumn', 'Summar', 'Fall']
export const AcademicSemestercode: TAcademicSemesterCode[] = ['01', '02', '03']



export const academicSemesterCodeandNameMaper: AcademicSemesterNameandCode = {
    Autumn: '01',
    Summar: '02',
    Fall: '03',
}