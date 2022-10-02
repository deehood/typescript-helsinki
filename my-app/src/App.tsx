import Header from "./components/Header";
import Content from "./components/Content";
import Total from "./components/Total";
import { Courses } from "./types";

const App = () => {
    const courseName = "Half Stack application development";

    const totalCount = (coursesArray: Courses): number => {
        return coursesArray.reduce((acc, next) => {
            acc += next.exerciseCount;
            return acc;
        }, 0);
    };

    const courseParts = [
        {
            name: "Fundamentals",
            exerciseCount: 10,
        },
        {
            name: "Using props to pass data",
            exerciseCount: 7,
        },
        {
            name: "Deeper type usage",
            exerciseCount: 14,
        },
    ];

    return (
        <div>
            <Header courseName={courseName} />
            <Content courses={courseParts} />
            <Total total={totalCount(courseParts)} />
        </div>
    );
};

export default App;
