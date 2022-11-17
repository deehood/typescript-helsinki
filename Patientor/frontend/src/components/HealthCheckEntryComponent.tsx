// import { SubEntryProps } from "../types";
import { HealthCheckEntry, HealthCheckRating } from "../types";
import MonitorHeartIcon from "@mui/icons-material/MonitorHeart";
import FavoriteIcon from "@mui/icons-material/Favorite";

interface HealthCheckEntryProps {
    entry: HealthCheckEntry;
    getDiagName(code: string): JSX.Element;
}

const assertNever = (value: never): never => {
    throw new Error(`Unhandled discriminated union member: ${JSON.stringify(value)}`);
};

function getHeartColor(rating: HealthCheckRating): string {
    switch (rating) {
        case HealthCheckRating.Healthy:
            return "green";
            break;
        case HealthCheckRating.LowRisk:
            return "yellow";
            break;
        case HealthCheckRating.HighRisk:
            return "orange";
            break;
        case HealthCheckRating.CriticalRisk:
            return "purple";
            break;
        default:
            return assertNever(rating);
    }
}
const HealthCheckEntryComponent = ({ entry, getDiagName }: HealthCheckEntryProps): JSX.Element => {
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
                    <MonitorHeartIcon style={{ marginLeft: "10px" }} />
                </div>
                <i> {entry.description}</i>
            </div>
            <FavoriteIcon
                style={{
                    marginTop: "5px",
                    marginBottom: "-10px",
                    color: getHeartColor(entry.healthCheckRating),
                }}
            />
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

export default HealthCheckEntryComponent;
