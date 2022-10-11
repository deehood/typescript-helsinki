import { SubEntryProps } from "../types";

const OccupationalHealthcareEntry = ({
    entry,
    getDiagName,
}: SubEntryProps): JSX.Element => {
    return (
        <div className="entry">
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
        </div>
    );
};

export default OccupationalHealthcareEntry;
