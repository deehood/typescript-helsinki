import { Diagnosis, EntryProps } from "../types";

import { useStateValue } from "../state";
import HospitalEntryComponent from "./HospitalEntryComponent";
import OccupationalHealthcareEntryComponent from "./OccupationalHealthcareEntryComponent";
import HealthCheckEntryComponent from "./HealthCheckEntryComponent";
const assertNever = (value: never): never => {
    throw new Error(
        `Unhandled discriminated union member: ${JSON.stringify(value)}`
    );
};

const EntryDetail = ({ entry }: EntryProps) => {
    const [{ diagnosisList }] = useStateValue();

    function getDiagName(code: string): JSX.Element {
        const name = diagnosisList.find(
            (x: Diagnosis) => x.code === code
        )?.name;
        return <> {name}</>;
    }

    switch (entry.type) {
        case "Hospital":
            return (
                <HospitalEntryComponent
                    entry={entry}
                    getDiagName={getDiagName}
                />
            );
        case "HealthCheck":
            return (
                <HealthCheckEntryComponent
                    entry={entry}
                    getDiagName={getDiagName}
                />
            );
        case "OccupationalHealthcare":
            return (
                <OccupationalHealthcareEntryComponent
                    entry={entry}
                    getDiagName={getDiagName}
                />
            );
        default:
            return assertNever(entry);
    }

    return (
        <>
            <div>
                <u>{entry.date}</u> {entry.description}
            </div>
            <ul>
                {entry.diagnosisCodes?.map((diagCode) => (
                    <li key={diagCode}>
                        <span>
                            {diagCode}
                            {diagCode && console.log(getDiagName(diagCode))}
                            {getDiagName(diagCode)}
                        </span>
                    </li>
                ))}
            </ul>
        </>
    );
};
export default EntryDetail;
