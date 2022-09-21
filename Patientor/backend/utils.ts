import { Patient } from "./types";
import { v1 as uuid } from "uuid";

const toNewPatient = (obj: any): Patient => {
    const id = uuid();
    const newObj: Patient = {
        id,
        ...obj,
    };

    patientData.push(newObj);
    return newObj;
};

export default toNewPatient;
