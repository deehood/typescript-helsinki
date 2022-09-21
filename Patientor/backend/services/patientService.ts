import patientData from "../data/patients";
import { PatientWithoutSsn } from "../types";
import toNewPatient from "../utils";

const getPatients = (): Array<PatientWithoutSsn> => {
    return patientData.map(({ id, name, dateOfBirth, gender, occupation }) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation,
    }));
};

// type Fields = {
//     name: unknown;
//     dateOfBirth: unknown;
//     ssn: unknown;
//     gender: unknown;
//     occupation: unknown;
// };

const addPatient = (obj: any) => {
    const newPatient = toNewPatient(obj);

    patientData.push(newPatient);
    return newPatient;

    // {
    //     name,
    //     dateOfBirth,
    //     ssn,
    //     gender,
    //     occupation,
    // }: Fields): Patient => {
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
};

export default {
    getPatients,
    addPatient,
};
