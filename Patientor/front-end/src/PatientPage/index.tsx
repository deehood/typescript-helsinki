import { useParams } from "react-router-dom";
import { Patient } from "../types";
import { apiBaseUrl } from "../constants";
import axios from "axios";
import { useEffect, useState } from "react";
import FemaleIcon from "@mui/icons-material/Female";
import MaleIcon from "@mui/icons-material/Male";
import TransgenderIcon from "@mui/icons-material/Transgender";
import { useStateValue, loadPatient } from "../state";

const PatientPage = () => {
    const { id } = useParams<{ id: string }>();
    const [patientData, setPatientData] = useState<Patient>();
    const [diagnosisData, setDiagnosisData] = useState<string[]>();
    const [{ currentPatient }, dispatch] = useStateValue();

    const fetchPatientData = async (id: string) => {
        try {
            const patient = await axios.get<Patient>(
                `${apiBaseUrl}/patients/${id}`
            );
            if (patient.data) {
                if (patient.data.entries && patient.data.entries.length !== 0) {
                    const diags: Array<string> = patient.data.entries.reduce(
                        (acc: Array<string>, entry) =>
                          return  acc.concat([...entry.diagnosisCodes])
                    );
                    console.log("diags", diags);
                    if (diags) setDiagnosisData(diags);
                }
            }

            setPatientData(patient.data);
            dispatch(loadPatient(patient.data));
        } catch (e) {
            console.error(e);
        }
    };
    //if there is currentPatient in state use it otherwise fetch new currentPatient
    useEffect(() => {
        if (id) {
            id === currentPatient?.id
                ? setPatientData(currentPatient)
                : void fetchPatientData(id);
        }
    }, [id]);

    return (
        <div>
            {patientData && (
                <div>
                    <h4>
                        {patientData.name}
                        {diagnosisData}
                        {patientData.gender === "female" && <FemaleIcon />}
                        {patientData.gender === "male" && <MaleIcon />}
                        {patientData.gender === "other" && <TransgenderIcon />}
                    </h4>
                    <div>ssn: {patientData.ssn}</div>
                    <div>occupation: {patientData.occupation}</div>
                    <div>
                        {patientData.entries?.length !== 0 && (
                            <p>
                                <b>Entries</b>
                            </p>
                        )}
                        {patientData.entries?.map((entry) => (
                            <div key={entry.id}>
                                <div>
                                    <u>{entry.date}</u> {entry.description}
                                </div>
                                <ul>
                                    {entry.diagnosisCodes?.map((diagCode) => (
                                        <li key={diagCode}>{diagCode}</li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default PatientPage;
