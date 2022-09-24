import { Patient, Gender } from "./types";
import { v1 as uuid } from "uuid";

const isString = (text: unknown): text is string => {
    return typeof text === "string" || text instanceof String;
};
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isGender = (text: any): text is Gender => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    return Object.values(Gender).includes(text);
};

const parseString = (field: unknown): string => {
    if (!field || !isString(field)) {
        throw new Error(`${field} is not a string`);
    }
    return field;
};

const parseGender = (field: unknown): Gender => {
    if (!field || !isGender(field)) {
        throw new Error(`${field} is not a gender`);
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
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const toNewPatient = (obj: any): Patient => {
    if (!Object.prototype.hasOwnProperty.call(obj, "id")) {
        obj.id = uuid();
    }
    const newObj: Patient = {
        id: obj.id as string,
        name: parseString(obj.name),
        dateOfBirth: parseDate(obj.dateOfBirth),
        ssn: parseString(obj.ssn),
        gender: parseGender(obj.gender),
        occupation: parseString(obj.occupation),
    };

    return newObj;
};

export default toNewPatient;
