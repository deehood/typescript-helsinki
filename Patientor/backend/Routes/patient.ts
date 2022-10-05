import express from "express";
import patientService from "../services/patientService";

const router = express.Router();

router.get("/", (_req, res) => {
    const result = patientService.getPatients();
    result ? res.send(result) : res.sendStatus(404);
});

router.get("/:id", (req, res) => {
    const result = patientService.getPatientData(req.params.id);
    result ? res.send(result) : res.sendStatus(404);
});

router.post("/", (req, res) => {
    try {
        const newPatient = patientService.addPatient(req.body);
        res.send(newPatient);
    } catch (error: unknown) {
        console.log(error);
        res.status(400).send(` ${error}`);
    }
});

export default router;
