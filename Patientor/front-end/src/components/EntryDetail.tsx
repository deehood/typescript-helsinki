import { Diagnosis, Entry } from "../types";
import { useStateValue } from "../state";
const [{ diagnosisList }] = useStateValue();

function getDiagName(code: string): JSX.Element {
    const name = diagnosisList.find((x: Diagnosis) => x.code === code)?.name;
    return <> {name}</>;
}

const EntryDetail = (entry: Entry) => {
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
                            {getDiagName(diagCode)}
                        </span>
                    </li>
                ))}
            </ul>
        </>
    );
};
export default EntryDetail;
