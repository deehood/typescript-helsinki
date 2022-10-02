import React from "react";
import { CourseName } from "../types";
const Header = ({ courseName }: CourseName) => {
    return <div>{courseName}</div>;
};

export default Header;
