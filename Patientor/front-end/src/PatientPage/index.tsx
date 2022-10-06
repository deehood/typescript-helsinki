import { useParams } from "react-router-dom";
import { Patient } from "../types";
import { apiBaseUrl } from "../constants";
import axios from "axios";
import { useEffect, useState } from "react";
import FemaleIcon from "@mui/icons-material/Female";
import MaleIcon from "@mui/icons-material/Male";
import TransgenderIcon from "@mui/icons-material/Transgender";
import { useStateValue } from "../state";

const PatientPage = () => {
    const { id } = useParams<{ id: string }>();
    const [patientData, setPatientData] = useState<Patient>();
    const [{ patients }] = useStateValue();
    console.log("id", id);
    console.log("patients", patients);

    useEffect(() => {
        if (id && patients) {
            const fetchPatientData = async () => {
                try {
                    const result = await axios.get<Patient>(
                        `${apiBaseUrl}/patients/${id}`
                    );

                    setPatientData(result.data);
                } catch (e) {
                    console.error(e);
                }
            };

            void fetchPatientData();
        }
    }, [patients]);

    return (
        <div>
            {patientData && (
                <div>
                    <h4>
                        {patientData.name}
                        {patientData.gender === "female" && <FemaleIcon />}
                        {patientData.gender === "male" && <MaleIcon />}
                        {patientData.gender === "other" && <TransgenderIcon />}
                    </h4>
                    <div>ssn: {patientData.ssn}</div>
                    <div>occupation: {patientData.occupation}</div>
                </div>
            )}
        </div>
    );
};

export default PatientPage;
