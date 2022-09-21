import express from "express";
import patientService from "../services/patientService";
// import toNewPatient from "../utils";
// import { Patient, NewPatient } from "../types";

const router = express.Router();

router.get("/", (_req, res) => {
    res.send(patientService.getPatients());
});

router.post("/", (req, res) => {
    // const newPatient: Patient = toNewPatient(req.body);
    res.send(patientService.addPatient(req.body));
});

export default router;
