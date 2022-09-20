import { Diagnose } from "../types";
import diagnoseData from "../data/diagnoses";

const diagnoses: Array<Diagnose> = diagnoseData;

const getDiagnoses = (): Array<Diagnose> => {
    return diagnoses;
};
export default {
    getDiagnoses,
};
