import express from "express";
import patientService from "../services/patientService";
import toNewPatient from "../utils";

const router = express.Router();

router.get("/", (_req, res) => {
    res.send(patientService.getPatients());
});

router.post("/", (req, res) => {
    const newPatient = toNewPatient(req.body);
    res.send(newPatient);
});

export default router;
