import express, { Request, Response, ErrorRequestHandler } from "express";
import cors from "cors";

const app = express();
const PORT = 3003;

app.listen(PORT, () => console.log(`connected to ${PORT}`));
app.use(express.json());
app.use(cors());

const errorHandler: ErrorRequestHandler = (err, _req, res, next) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access
    res.status(err.status || 500);
    const msg = "Sorry , thats was an Invalid object";
    console.log(msg);
    res.send(msg);
    next(err);
};

app.post("/", (req: Request, res: Response) => {
    try {
        const result = calculateExercises([
            ...parseArguments2([
                // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
                req.body.target,
                // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access
                ...parseArguments2(req.body.daily_exercises),
            ]),
        ]);

        console.log("result", result);
        res.send(result);
    } catch (error) {
        let msg = "Sorry, there was an error. ";
        if (error instanceof Error) msg += `Error : ${error.message}`;
        console.log(msg);
        res.status(400).send(msg);
    }
});

app.use(errorHandler);
interface resultType {
    target: number;
    totalDays: number;
    trainingDays: number;
    averageTime: number;
    isTargetReached: boolean;
    rating: 1 | 2 | 3;
    text: string;
}
// for the post body object
const parseArguments2 = (args: string[] | number[]): number[] => {
    if (args.length < 2) throw new Error("Not enough arguments");

    const result: number[] = [];

    args.forEach((value: string | number) => {
        if (!isNaN(Number(value))) {
            result.push(Number(value));
        } else throw new Error("i must have only numbers");
    });
    return result;
};

//original has arg0 and 1 text
const parseArguments = (args: string[] | number[]): number[] => {
    if (args.length < 4) throw new Error("Not enough arguments");

    const result: number[] = [];

    args.forEach((value: string | number, index: number) => {
        if (!isNaN(Number(value))) {
            result.push(Number(value));
        } else if (index > 1) throw new Error("i must have only numbers");
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
    console.log(calculateExercises(parseArguments(process.argv)));
} catch (error) {
    let msg = "there was an error. ";
    if (error instanceof Error) msg += `Error : ${error.message}`;
    console.log(msg);
}
