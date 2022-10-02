export interface Course {
    name: string;
    exerciseCount: number;
}

export interface CoursesProps {
    courses: Course[];
}

export interface NameProps {
    courseName: string;
}

export interface TotalExercisesProps {
    totalExercises: number;
}
