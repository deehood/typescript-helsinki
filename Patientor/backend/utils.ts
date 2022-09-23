import { Patient } from "./types";
import { v1 as uuid } from "uuid";

const isString = (text: unknown): text is string => {
    return typeof text === "string" || text instanceof String;
};

const parseString = (field: unknown): string => {
    if (!field || !isString(field)) {
        throw new Error(`${field} is not a string`);
    }
    return field;
};

const isDate = (date: string): boolean => Boolean(Date.parse(date));

const parseDate = (date: unknown): string => {
    if (!date || !isString(date) || !isDate(date)) {
        throw new Error("incorrect or missing date: " + date);
    }
    return date;
};
const toNewPatient = (obj: any): Patient => {
    const id = uuid();
    const newObj: Patient = {
        id,
        name: parseString(obj.name),
        dateOfBirth: parseDate(obj.dateOfBirth),
        ssn: parseString(obj.ssn),
        gender: parseString(obj.gender),
        occupation: parseString(obj.occupation),
    };

    return newObj;
};

export default toNewPatient;
