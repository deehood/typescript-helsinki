import React from "react";
import { TotalExercises } from "../types";
const Total = (total: TotalExercises) => {
    return (
        <div>
            <p>Number of exercises {total}</p>
        </div>
    );
};

export default Total;
