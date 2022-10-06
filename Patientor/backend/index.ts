import express from "express";
import cors from "cors";
import diagnoseRouter from "./Routes/diagnose";
import patientRouter from "./Routes/patient";

const app = express();

app.use(express.json());
app.use(cors());

app.get("/ping", (_req, res) => {
    console.log("pong");

    res.send("pong");
});

app.use("/api/diagnosis", diagnoseRouter);
app.use("/api/patients", patientRouter);

const PORT = 3001;

app.listen(PORT, () => {
    console.log(`connected to port ${PORT}`);
});
