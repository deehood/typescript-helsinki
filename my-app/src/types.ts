export interface NameProps {
    courseName: string;
}

export interface CoursesProps {
    courses: CoursePart[];
}
export interface CourseProps {
    course: CoursePart;
}

export interface TotalExercisesProps {
    totalExercises: number;
}

export interface CoursePartBase {
    name: string;
    exerciseCount: number;
    type: string;
}

export interface CoursePartBaseWithDescription extends CoursePartBase {
    description: string;
}
export interface CourseNormalPart extends CoursePartBaseWithDescription {
    type: "normal";
}

export interface CourseProjectPart extends CoursePartBase {
    type: "groupProject";
    groupProjectCount: number;
}

export interface CourseSpecialPart extends CoursePartBaseWithDescription {
    type: "special";
    requirements: Array<string>;
}

export interface CourseSubmissionPart extends CoursePartBaseWithDescription {
    type: "submission";
    exerciseSubmissionLink: string;
}

export type CoursePart =
    | CourseNormalPart
    | CourseProjectPart
    | CourseSubmissionPart
    | CourseSpecialPart;
