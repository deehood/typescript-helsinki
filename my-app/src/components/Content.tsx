import { CoursesProps, CoursePart } from "../types";
import Part from "./Part";

const Content = ({ courses }: CoursesProps): JSX.Element => {
    if (courses) {
        return (
            { courses } && (
                <>
                    {courses.map((course: CoursePart) => {
                        return (
                            <div key={course.name}>
                                <Part course={course} />
                                <br />
                            </div>
                        );
                    })}
                </>
            )
        );
    }

    return <div>No Data ...</div>;
};

export default Content;
