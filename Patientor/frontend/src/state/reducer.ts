import { State } from "./state";
import { Patient, Diagnosis, Entry } from "../types";

export type Action =
    | {
          type: "SET_PATIENT_LIST";
          payload: Patient[];
      }
    | {
          type: "ADD_PATIENT";
          payload: Patient;
      }
    | {
          type: "ADD_ENTRY";
          payload: Entry;
      }
    | {
          type: "LOAD_PATIENT";
          payload: Patient;
      }
    | {
          type: "SET_DIAGNOSIS_LIST";
          payload: Diagnosis[];
      };

export function setPatientList(patients: Patient[]): Action {
    return {
        type: "SET_PATIENT_LIST",
        payload: patients,
    };
}

export function setDiagnosisList(diagnosisList: Diagnosis[]): Action {
    return {
        type: "SET_DIAGNOSIS_LIST",
        payload: diagnosisList,
    };
}

export function loadPatient(patient: Patient): Action {
    return {
        type: "LOAD_PATIENT",
        payload: patient,
    };
}

export function addPatient(patient: Patient): Action {
    return {
        type: "ADD_PATIENT",
        payload: patient,
    };
}

export function addEntry(entry: Entry): Action {
    return {
        type: "ADD_ENTRY",
        payload: entry,
    };
}
export const reducer = (state: State, action: Action): State => {
    switch (action.type) {
        case "SET_PATIENT_LIST":
            return {
                ...state,
                patients: {
                    ...action.payload.reduce(
                        (memo, patient) => ({ ...memo, [patient.id]: patient }),
                        {}
                    ),
                    ...state.patients,
                },
            };
        case "SET_DIAGNOSIS_LIST":
            return {
                ...state,
                diagnosisList: [...action.payload],
            };
        case "ADD_PATIENT":
            return {
                ...state,
                patients: {
                    ...state.patients,
                    [action.payload.id]: action.payload,
                },
            };
        case "ADD_ENTRY":
            console.log("resolver", action.payload);

            if (state.currentPatient)
                return {
                    ...state,
                    patients: {
                        ...state.patients,
                        [state.currentPatient.id]: {
                            ...state.currentPatient,
                            entries: state.currentPatient.entries?.concat(action.payload),
                        },
                    },
                    currentPatient: {
                        ...state.currentPatient,
                        entries: state.currentPatient.entries?.concat(action.payload),
                    },
                };
            else return state;

        case "LOAD_PATIENT":
            return {
                ...state,
                currentPatient: action.payload,
            };

        default:
            return state;
    }
};
