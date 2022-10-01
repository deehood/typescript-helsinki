import Header from "./components/Header";
import Content from "./components/Content";

const App = () => {
    const courseName = "Half Stack application development";

    const totalCount = (coursesArray:CourseList):Number

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
            <Header courseName2={courseName} />
            <Content courses={courseParts} />
            <Total total ={{courseParts.reduce(
                    (carry, part) => carry + part.exerciseCount,
                    0}
        </div>
    );
};

export default App;
