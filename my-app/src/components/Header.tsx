import React from "react";
import { NameProps } from "../types";
const Header = ({ courseName }: NameProps) => {
    return <h3>{courseName}</h3>;
};

export default Header;
