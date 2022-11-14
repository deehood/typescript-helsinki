import {
    Patient,
    Gender,
    Entry,
    BaseEntry,
    HospitalEntry,
    HealthCheckEntry,
    OccupationalHealthcareEntry,
    HealthCheckRating,
    Diagnosis,
    Discharge,
    SickLeave,
} from "./types";
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
const isHealthCheckRating = (field: unknown): field is HealthCheckRating => {
    return typeof field === "number" && field >= 0 && field <= 3;
};

const parseHealthCheckRating = (field: unknown): HealthCheckRating => {
    console.log(field);
    if (field === "undefined" || field === "null" || !isHealthCheckRating(field))
        throw new Error("incorrect rating " + field);
    return field;
};
const isDiagnosisCodes = (field: unknown): field is Array<Diagnosis["code"]> => {
    return Array.isArray(field) && field.length > 0;
};

const parseArray = (field: unknown): Array<Diagnosis["code"]> => {
    if (!isDiagnosisCodes(field)) throw new Error("incorrect diagnosis codes " + field);
    return field;
};

const isDischarge = (field: any): field is Discharge => {
    return (
        "date" in field &&
        "criteria" in field &&
        isString(field.date) &&
        isString(field.criteria) &&
        isDate(field["date"])
    );
};
const parseDischarge = (field: unknown): Discharge => {
    if (!field || typeof field !== "object" || !isDischarge(field))
        throw new Error("incorrect discharge " + field);

    return field;
};

const isSickLeave = (field: any): field is SickLeave => {
    return (
        "startDate" in field &&
        "endDate" in field &&
        isString(field.startDate) &&
        isString(field.endDate) &&
        isDate(field["startDate"]) &&
        isDate(field["endDate"])
    );
};
const parseSickleave = (field: unknown): SickLeave => {
    if (!field || typeof field !== "object" || !isSickLeave(field))
        throw new Error("incorrect sick leave" + field);

    return field;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const checkNewEntry = (obj: any): Entry => {
    if (!Object.prototype.hasOwnProperty.call(obj, "id")) {
        obj.id = uuid();
    }
    // check for base
    const baseObj: BaseEntry = {
        id: obj.id as string,
        description: parseString(obj.description),
        date: parseDate(obj.date),
        specialist: parseString(obj.specialist),
    };

    if (obj.diagnosisCodes) baseObj.diagnosisCodes = parseArray(obj.diagnosisCodes);

    console.log(obj, obj.type);
    switch (obj.type) {
        case "Hospital": {
            const entry: HospitalEntry = {
                ...baseObj,
                type: "Hospital",
                discharge: parseDischarge(obj.discharge),
            };

            if (obj.healthCheckRating) {
                entry.healthCheckRating = parseHealthCheckRating(obj.healthCheckRating);
                return entry;
            }

            return entry;
        }

        case "HealthCheck": {
            const entry: HealthCheckEntry = {
                ...baseObj,
                type: "HealthCheck",
                healthCheckRating: parseHealthCheckRating(obj.healthCheckRating),
            };

            return entry;
        }

        case "OccupationalHealthcare": {
            const entry: OccupationalHealthcareEntry = {
                ...baseObj,
                type: "OccupationalHealthcare",
                employerName: parseString(obj.employerName),
            };

            if (obj.sickLeave) {
                entry.sickLeave = parseSickleave(obj.sickLeave);
                return entry;
            }

            return entry;
        }
        default:
            throw new Error("failed");
    }
};

export { toNewPatient, checkNewEntry };
