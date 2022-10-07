import { Diagnosis } from "../types";
import diagnoseData from "../data/diagnoses";

const diagnosis: Array<Diagnosis> = diagnoseData;

const getDiagnoses = (): Array<Diagnosis> => {
    return diagnosis;
};

export default {
    getDiagnoses,
};
