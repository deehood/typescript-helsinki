import express from "express";
import { parseArguments, calculateBmi } from "./bmiCalculator";

const app = express();

const PORT = 3002;
app.listen(PORT, () => console.log(`listening on port ${PORT}`));

app.get("/bmi", (req, res) => {
    try {
        if (req.query.height && req.query.weight) {
            const { value1, value2 } = parseArguments([
                req.query.height.toString(),
                req.query.weight.toString(),
            ]);
            res.send({
                "height: ": value1,
                "weight: ": value2,
                "bmi: ": calculateBmi(value1, value2),
            });
            console.log(calculateBmi(value1, value2));
        }
    } catch (error) {
        let msg = "Hey, ";
        if (error instanceof Error) msg += error.message;
        res.status(400).send(msg);
    }
});
