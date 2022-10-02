export interface Course {
    name: string;
    exerciseCount: number;
}
export interface Courses {
    courses: Array<Course>;
}

export interface CourseName {
    courseName: string;
}

export type TotalExercises = number;
