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
    const [{ currentPatient }, dispatch] = useStateValue();

    const fetchPatientData = async (id: string) => {
        try {
            const result = await axios.get<Patient>(
                `${apiBaseUrl}/patients/${id}`
            );
            if (result.data) {
                setPatientData(result.data);
                dispatch(loadPatient(result.data));
            }
        } catch (e) {
            console.error(e);
        }
    };
    //if there is currentPatient in state use it otherwise fetch new curentPatient
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
