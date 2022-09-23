import express from "express";
import patientService from "../services/patientService";
// import { Patient } from "../types";

const router = express.Router();

router.get("/", (_req, res) => {
    patientService.getPatients()
        ? res.send(patientService.getPatients())
        : res.sendStatus(404);
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
