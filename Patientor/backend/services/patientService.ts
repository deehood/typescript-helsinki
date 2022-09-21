import patientData from "../data/patients";
import { PatientWithoutSsn, Patient } from "../types";

import { v1 as uuid } from "uuid";

const getPatients = (): Array<PatientWithoutSsn> => {
    return patientData.map(({ id, name, dateOfBirth, gender, occupation }) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation,
    }));
};

type Fields = {
    name: unknown;
    dateOfBirth: unknown;
    ssn: unknown;
    gender: unknown;
    occupation: unknown;
};

const addPatient = ({
    name,
    dateOfBirth,
    ssn,
    gender,
    occupation,
}: Fields): Patient => {
    //     const newObj={
    //         id:uuid(),
    //         name: parseName(obj.name),
    //         dateOfBirth: parseDate(obj.date),
    //         ssn: parseSsn(obj.ssn),
    //         gender: parseGender(obj.gender),
    //         occupation: parseOccupation(obj.occupation),
    //     }
    //    return newObj
    // };

    const id = uuid();
    const newObj = {
        id,
        name,
        dateOfBirth,
        ssn,
        gender,
        occupation,
    };
    patientData.push(newObj);
    return newObj;
};

export default {
    getPatients,
    addPatient,
};
