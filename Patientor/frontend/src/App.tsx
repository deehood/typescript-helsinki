import { useEffect } from "react";
import axios from "axios";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import { Button, Divider, Container } from "@material-ui/core";

import { apiBaseUrl } from "./constants";
import { useStateValue, setPatientList, setDiagnosisList } from "./state";
import { Diagnosis, Patient } from "./types";

import PatientListPage from "./PatientListPage";
import PatientPage from "./PatientPage";
import { Typography } from "@material-ui/core";

const App = () => {
    const [_state, dispatch] = useStateValue();
    console.log("App state ", _state);

    useEffect(() => {
        void axios.get<void>(`${apiBaseUrl}/ping`);

        const fetchPatientList = async () => {
            try {
                const { data: patientListFromApi } = await axios.get<Patient[]>(
                    `${apiBaseUrl}/patients`
                );
                dispatch(setPatientList(patientListFromApi));
            } catch (e) {
                console.error(e);
            }
        };
        const fetchDiagnosisList = async () => {
            try {
                const { data: diagnosisListFromApi } = await axios.get<Diagnosis[]>(
                    `${apiBaseUrl}/diagnosis`
                );
                dispatch(setDiagnosisList(diagnosisListFromApi));
            } catch (e) {
                console.error(e);
            }
        };
        if (Object.entries(_state.patients).length === 0) void fetchPatientList();
        void fetchDiagnosisList();
    }, []);

    return (
        <div className="App">
            <Router>
                <Container>
                    <Typography variant="h3" style={{ marginBottom: "0.5em" }}>
                        Patientor
                    </Typography>
                    <Button component={Link} to="/" variant="contained" color="primary">
                        Home
                    </Button>

                    <Divider hidden />
                    <Routes>
                        <Route path="/" element={<PatientListPage />} />
                        <Route path="/patients/:id" element={<PatientPage />} />
                    </Routes>
                </Container>
            </Router>
        </div>
    );
};

export default App;
