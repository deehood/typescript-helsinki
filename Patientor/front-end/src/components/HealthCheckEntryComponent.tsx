// import { SubEntryProps } from "../types";
import { HealthCheckEntry, HealthCheckRating } from "../types";
import MonitorHeartIcon from "@mui/icons-material/MonitorHeart";
import FavoriteIcon from "@mui/icons-material/Favorite";

interface HealthCheckEntryProps {
    entry: HealthCheckEntry;
    getDiagName(code: string): JSX.Element;
}

function getHeartColor(rating: HealthCheckRating): string {
    switch (rating) {
        case 0:
            return "green";
            break;
        case 1:
            return "yellow";
            break;
        case 2:
            return "orange";
            break;
        case 3:
            return "purple";
            break;
        default:
            return "white";
    }
}
const HealthCheckEntryComponent = ({
    entry,
    getDiagName,
}: HealthCheckEntryProps): JSX.Element => {
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

export default HealthCheckEntryComponent;
