import patientData from "../data/patients";
import { Patient, PublicPatient } from "../types";
import toNewPatient from "../utils";

const getPatientData = (id: string): Patient | undefined => {
    const found: Patient | undefined = patientData.find(
        (patient) => patient.id === id
    );
    return found
        ? {
              id: found.id,
              name: found.name,
              ssn: found.ssn,
              dateOfBirth: found.dateOfBirth,
              gender: found.gender,
              occupation: found.occupation,
              entries: found.entries,
          }
        : undefined;
};

const getPatients = (): Array<PublicPatient> => {
    return patientData.map(({ id, name, dateOfBirth, gender, occupation }) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation,
    }));
};

const addPatient = (obj: unknown) => {
    const patientToAdd: Patient = toNewPatient(obj);
    patientData.push(patientToAdd);
    return patientToAdd;
};

export default {
    getPatients,
    getPatientData,
    addPatient,
};
