import { CourseProps } from "../types";

const assertNever = (value: never): never => {
    throw new Error(
        `Unhandled discriminated union member: ${JSON.stringify(value)}`
    );
};
const Part = ({ course }: CourseProps): JSX.Element => {
    switch (course.type) {
        case "normal":
            return (
                <div>
                    {course.name} {course.exerciseCount}
                    <br />
                    {course.description}
                </div>
            );

        case "groupProject":
            return (
                <div>
                    {course.name} {course.exerciseCount}
                    <br />
                    project exercises {course.groupProjectCount}
                </div>
            );

        case "submission":
            return (
                <div>
                    {course.name} {course.exerciseCount}
                    <br />
                    {course.description}
                    <br />
                    {course.exerciseSubmissionLink}
                </div>
            );

        case "special":
            return (
                <div>
                    {course.name} {course.exerciseCount}
                    <br />
                    {course.description}
                    <br />
                    required skills: {course.requirements.join(", ")}
                </div>
            );
        default:
            return assertNever(course);
    }
};

export default Part;
