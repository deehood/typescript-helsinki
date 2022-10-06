import Header from "./components/Header";
import Content from "./components/Content";
import Total from "./components/Total";
import { CoursePart } from "./types";

const App = () => {
    const courseName = "Half Stack application development";

    const totalCount = (coursesArray: CoursePart[]): number => {
        return coursesArray.reduce((acc: number, next: CoursePart) => {
            acc += next.exerciseCount;
            return acc;
        }, 0);
    };

    const courses: Array<CoursePart> = [
        {
            name: "Fundamentals",
            exerciseCount: 10,
            description: "This is the easy course part",
            type: "normal",
        },
        {
            name: "Advanced",
            exerciseCount: 7,
            description: "This is the hard course part",
            type: "normal",
        },
        {
            name: "Using props to pass data",
            exerciseCount: 7,
            groupProjectCount: 3,
            type: "groupProject",
        },
        {
            name: "Deeper type usage",
            exerciseCount: 14,
            description: "Confusing description",
            exerciseSubmissionLink:
                "https://fake-exercise-submit.made-up-url.dev",
            type: "submission",
        },
        {
            name: "Backend development",
            exerciseCount: 21,
            description: "Typing the backend",
            requirements: ["nodejs", "jest"],
            type: "special",
        },
    ];

    return (
        <div>
            <Header courseName={courseName} />
            <Content courses={courses} />
            <Total totalExercises={totalCount(courses)} />
        </div>
    );
};

export default App;