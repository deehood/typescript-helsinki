import { Diagnosis } from "../types";
import diagnoseData from "../data/diagnoses";

const diagnosis: Array<Diagnosis> = diagnoseData;

const getDiagnoses = (): Array<Diagnosis> => {
    return diagnosis;
};

const getDiagnosisData = (diagnosisCodes: Array<string>): Array<Diagnosis> => {
    let found: Diagnosis | undefined;

    const diagArray = diagnosisCodes.reduce(
        (accArray: Array<Diagnosis>, diagCode) => {
            found = diagnoseData.find((fields) => fields.code === diagCode);

            return found ? accArray.concat(found) : accArray;
        },
        []
    );
    return diagArray;
};

export default {
    getDiagnoses,
    getDiagnosisData,
};
