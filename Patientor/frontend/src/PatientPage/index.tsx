import { useParams } from "react-router-dom";
import { Patient, Entry } from "../types";
import { apiBaseUrl } from "../constants";
import axios from "axios";
import { useEffect, useState } from "react";
import FemaleIcon from "@mui/icons-material/Female";
import MaleIcon from "@mui/icons-material/Male";
import TransgenderIcon from "@mui/icons-material/Transgender";
import { useStateValue, loadPatient } from "../state";
import EntryDetail from "../components/EntryDetail";
import { Button } from "@mui/material";
import AddEntryModal from "../AddEntryModal";

type PatientType = Patient | undefined;

const PatientPage = () => {
    const { id } = useParams<{ id: string }>();
    const [patientData, setPatientData] = useState<PatientType>();
    const [{ currentPatient }, dispatch] = useStateValue();

    const fetchPatientData = async (id: string) => {
        try {
            const patient = await axios.get<Patient>(`${apiBaseUrl}/patients/${id}`);
            if (patient.data) {
                setPatientData(patient.data);
                dispatch(loadPatient(patient.data));
            }
        } catch (e) {
            console.error(e);
        }
    };

    const [modalOpen, setModalOpen] = useState<boolean>(false);
    const [error, setError] = useState<string>();

    const openModal = (): void => setModalOpen(true);

    const closeModal = (): void => {
        setModalOpen(false);
        setError(undefined);
    };
    //TODO  async values: EntryFormValues
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const submitNewEntry = (values: any) => {
        console.log(values);

        // try {
        //     const { data: newEntry } = await axios.post<Entry>(`${apiBaseUrl}/Entries`, values);
        //     dispatch(addEntry(newEntry));
        //     closeModal();
        // } catch (e: unknown) {
        //     if (axios.isAxiosError(e)) {
        //         console.error(e?.response?.data || "Unrecognized axios error");
        //         setError(String(e?.response?.data?.error) || "Unrecognized axios error");
        //     } else {
        //         console.error("Unknown error", e);
        //         setError("Unknown error");
        //     }
        // }
    };

    //if there is currentPatient in state use it otherwise fetch new currentPatient
    useEffect(() => {
        if (id) {
            if (currentPatient && id === currentPatient.id) {
                setPatientData(currentPatient);
            } else void fetchPatientData(id);
        }
    }, [id]);

    return (
        <>
            {patientData ? (
                <>
                    <h4>
                        {patientData.name}

                        {patientData.gender === "female" && <FemaleIcon />}
                        {patientData.gender === "male" && <MaleIcon />}
                        {patientData.gender === "other" && <TransgenderIcon />}
                    </h4>
                    <div>ssn: {patientData.ssn}</div>
                    <div>occupation: {patientData.occupation}</div>

                    {patientData.entries && patientData.entries.length > 0 && (
                        <div>
                            <p>
                                <b>Entries</b>
                            </p>

                            {patientData.entries.map((entry: Entry) => (
                                <div key={entry.id}>
                                    <EntryDetail entry={entry} />
                                </div>
                            ))}
                        </div>
                    )}
                    <AddEntryModal
                        modalOpen={modalOpen}
                        onSubmit={submitNewEntry}
                        error={error}
                        onClose={closeModal}
                    />
                    <Button
                        size="small"
                        variant="contained"
                        sx={{
                            "&:hover": {
                                background: "#d5d5d5",
                            },
                            color: "black",
                            background: "#e0e0e0;",
                        }}
                        onClick={() => openModal()}
                    >
                        ADD ENTRY
                    </Button>
                </>
            ) : null}
        </>
    );
};

export default PatientPage;
