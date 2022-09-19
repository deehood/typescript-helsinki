import express from "express";
const app = express();
app.use(express.json());
const PORT = 3005;

app.get("/ping", (_req, res) => {
    console.log("someone pinged us");
    res.send("pong");
});
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
