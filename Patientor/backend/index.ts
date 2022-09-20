import express from "express";
import cors from "cors";
import diagnoseRouter from "./Routes/diagnose";

const app = express();

app.use(express.json());
app.use(cors());

app.get("/api/ping", (_req, res) => {
    res.send("pong");
});

app.use("/api/diagnoses", diagnoseRouter);

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`connected to port ${PORT}`);
});
