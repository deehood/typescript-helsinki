import express from "express";
import cors from "cors";

const app = express();
const PORT = 3003;

app.listen(PORT, () => console.log(`connected to ${PORT}`));
app.use(express.json());
app.use(cors());

app.put("/", (req, res) => {
    console.log(req.body);

    res.send(req.body);
});

interface resultType {
    target: number;
    totalDays: number;
    trainingDays: number;
    averageTime: number;
    isTargetReached: boolean;
    rating: 1 | 2 | 3;
    text: string;
}

const parseArguments2 = (args: string[]): number[] => {
    if (args.length < 3) throw new Error("Not enough arguments");

    const result: number[] = [];

    args.forEach((value: string, index: number) => {
        if (!isNaN(Number(value))) {
            result.push(Number(value));
        } else if (index > 1) throw new Error("i mus have only numbers");
    });
    return result;
};

function calculateExercises([target, ...training]: number[]): resultType {
    const calcRating = diff(avgArray(training), target);

    const result: resultType = {
        target: target,
        totalDays: training.length,
        trainingDays: training.filter((x) => x !== 0).length,
        averageTime: avgArray(training),
        isTargetReached: avgArray(training) < target ? false : true,
        rating: calcRating,
        text: ratingDesc(calcRating),
    };

    return result;
}

function diff(real: number, target: number): resultType["rating"] {
    if (real - target > 1) return 3;
    if (real - target < -1) return 1;
    return 2;
}

function ratingDesc(rating: resultType["rating"]): string {
    switch (rating) {
        case 1:
            return "poor";
            break;
        case 2:
            return "reasonable";
            break;
        case 3:
            return "great";
            break;

        default:
            return "error";
            break;
    }
}

function avgArray(values: number[]): number {
    return (
        values.reduce((prev: number, curr: number) => (prev += curr)) /
        values.length
    );
}

try {
    console.log(calculateExercises(parseArguments2(process.argv)));
} catch (error) {
    let msg = "there was an error. ";
    if (error instanceof Error) msg += `Error : ${error.message}`;
    console.log(msg);
}
