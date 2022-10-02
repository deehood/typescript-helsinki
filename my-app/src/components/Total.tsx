import React from "react";

import { TotalExercisesProps } from "../types";
const Total = ({ totalExercises }: TotalExercisesProps): JSX.Element => {
    return (
        <>
            <div>
                <p> Number of exercises {totalExercises} </p>
            </div>
        </>
    );
};

export default Total;
