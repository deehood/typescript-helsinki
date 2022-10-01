import React from "react";

const Total = () => {
    return (
        <div>
            <p>
                Number of exercises{" "}
                {courseParts.reduce(
                    (carry, part) => carry + part.exerciseCount,
                    0
                )}
            </p>
        </div>
    );
};

export default Total;
