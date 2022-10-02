// export interface Course {
//     name: string;
//     exerciseCount: number;
// }

// export interface CoursesProps {
//     courses: Course[];
// }

export interface NameProps {
    courseName: string;
}

export interface TotalExercisesProps {
    totalExercises: number;
}

export interface CoursePartBase {
    name: string;
    exerciseCount: number;
    type: string;
}

interface CourseNormalPart extends CoursePartBase {
    type: "normal";
    description: string;
}

interface CourseProjectPart extends CoursePartBase {
    type: "groupProject";
    groupProjectCount: number;
}

interface CourseSubmissionPart extends CoursePartBase {
    type: "submission";
    description: string;
    exerciseSubmissionLink: string;
}

export type CoursePart =
    | CourseNormalPart
    | CourseProjectPart
    | CourseSubmissionPart;
