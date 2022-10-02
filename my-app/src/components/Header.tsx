import React from "react";
import { NameProps } from "../types";
const Header = ({ courseName }: NameProps) => {
    return <div>{courseName}</div>;
};

export default Header;
