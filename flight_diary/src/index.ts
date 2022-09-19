import express from "express";
import diaryRouter from "../src/routes/diaries";
import cors from "cors";
const app = express();
app.use(express.json());
// eslint-disable-next-line @typescript-eslint/no-unsafe-call
app.use(cors());
const PORT = 3005;

app.get("/ping", (_req, res) => {
    console.log("someone pinged us");
    res.send("pong");
});

app.use("/api/diaries", diaryRouter);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
