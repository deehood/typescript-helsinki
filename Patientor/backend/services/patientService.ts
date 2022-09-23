import patientData from "../data/patients";
import { PatientWithoutSsn, Patient } from "../types";
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

const addPatient = (obj: unknown) => {
    const patientToAdd: Patient = toNewPatient(obj);
    patientData.push(patientToAdd);
    return patientToAdd;

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
