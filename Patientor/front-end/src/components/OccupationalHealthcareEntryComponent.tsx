import EngineeringIcon from "@mui/icons-material/Engineering";
import { OccupationalHealthcareEntry } from "../types";

interface OccupationalHealthcareEntryProps {
    entry: OccupationalHealthcareEntry;
    getDiagName(code: string): JSX.Element;
}

const OccupationalHealthcareEntryComponent = ({
    entry,
    getDiagName,
}: OccupationalHealthcareEntryProps): JSX.Element => {
    return (
        <div
            className="entry"
            style={{
                borderWidth: "2px",
                borderStyle: "solid",
                padding: "10px",
                margin: "10px",
            }}
        >
            <div>
                <div>
                    {entry.date}
                    <EngineeringIcon style={{ marginLeft: "10px" }} />
                </div>
                <i>{entry.description}</i>
            </div>

            <ul style={{ marginBottom: "0px", marginTop: "0px" }}>
                {entry.diagnosisCodes?.map((diagCode) => (
                    <li
                        key={diagCode}
                        style={{
                            paddingTop: "10px",
                        }}
                    >
                        <span>
                            {diagCode}
                            {diagCode && console.log(getDiagName(diagCode))}
                            {getDiagName(diagCode)}
                        </span>
                    </li>
                ))}
            </ul>
            <div style={{ marginTop: "20px" }}>
                Diagnose by {entry.specialist}
            </div>
        </div>
    );
};

export default OccupationalHealthcareEntryComponent;
