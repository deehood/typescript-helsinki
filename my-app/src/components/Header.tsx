import React from "react";

interface HeaderProps {
    courseName2: string;
}

const Header = ({ courseName2 }: HeaderProps) => {
    return <div>{courseName2}</div>;
};

export default Header;
