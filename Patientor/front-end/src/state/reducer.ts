import { State } from "./state";
import { Patient } from "../types";

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
          type: "LOAD_PATIENT";
          payload: Patient;
      };

export function setPatientList(patients: Patient[]): Action {
    return {
        type: "SET_PATIENT_LIST",
        payload: patients,
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
        case "ADD_PATIENT":
            return {
                ...state,
                patients: {
                    ...state.patients,
                    [action.payload.id]: action.payload,
                },
            };

        case "LOAD_PATIENT":
            return {
                ...state,
                currentPatient: action.payload,
            };

        default:
            return state;
    }
};
