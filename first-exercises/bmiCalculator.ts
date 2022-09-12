import express from "express";

const app = express();

app.get("/hello", (_req, res) => {
    res.send("Hello Full Stack");
});

const PORT = 3001;
app.listen(PORT, () => console.log(`listening on port ${PORT}`));

interface inputValues {
    value1: number;
    value2: number;
}

const parseArguments = (args: string[]): inputValues => {
    if (args.length < 3) throw new Error("welcome please give me numbers");
    if (args.length < 4) throw new Error("not enough arguments");
    if (args.length > 4) throw new Error("too many arguments");
    if (isNaN(Number(args[2])) || isNaN(Number(args[3])))
        throw new Error("i need numbers");
    if (Number(args[2]) > 0 && Number(args[3]) > 0)
        return { value1: Number(args[2]), value2: Number(args[3]) };
    throw new Error("i need positive numbers");
};

function calculateBmi(height: number, weight: number): string {
    const result = weight / (height / 100) ** 2;

    if (result < 18.5) return "underweight";
    if (result > 25) return "overweight";
    return "Normal (healthy weight)";
}

try {
    const { value1, value2 } = parseArguments(process.argv);
    console.log(calculateBmi(value1, value2));
} catch (error) {
    let msg = "Hey, ";
    if (error instanceof Error) msg += error.message;
    console.log(msg);
}
