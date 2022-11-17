import patientData from "../data/patients";
import { Entry, Patient, PublicPatient } from "../types";
import { toNewPatient, checkNewEntry } from "../utils";

const getPatientData = (id: string): Patient | undefined => {
    const found: Patient | undefined = patientData.find((patient) => patient.id === id);
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
//TODO get rid of pushes
const addPatient = (obj: unknown): Patient => {
    const patientToAdd: Patient = toNewPatient(obj);
    patientData.push(patientToAdd);
    return patientToAdd;
};

const addEntryForPatient = (patientId: unknown, obj: unknown): Entry => {
    const index = patientData.findIndex((patient) => patient.id === patientId);

    if (index === -1) throw new Error("id didn't match");

    const entryToAdd: Entry = checkNewEntry(obj);

    patientData[index].entries?.push(entryToAdd);

    return entryToAdd;
};

export default {
    getPatients,
    getPatientData,
    addPatient,
    addEntryForPatient,
};
