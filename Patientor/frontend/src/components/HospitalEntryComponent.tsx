import MedicalServicesIcon from "@mui/icons-material/MedicalServices";
import { HospitalEntry } from "../types";

interface HospitalEntryProps {
    entry: HospitalEntry;
    getDiagName(code: string): JSX.Element;
}

const HospitalEntryComponent = ({ entry, getDiagName }: HospitalEntryProps): JSX.Element => {
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
                {entry.date}
                <MedicalServicesIcon style={{ marginLeft: "10px" }} />{" "}
            </div>
            <div>
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

                            {getDiagName(diagCode)}
                        </span>
                    </li>
                ))}
            </ul>

            <div style={{ marginTop: "20px" }}>Diagnosed by {entry.specialist}</div>
        </div>
    );
};

export default HospitalEntryComponent;
