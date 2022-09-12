interface inputValues {
    value1: number;
    value2: number;
}

const parseArguments = (args: Array<string>): inputValues => {
    if (args.length < 4) throw new Error("Not enough arguments");
    if (args.length > 4) throw new Error("Too many arguments");
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
    let msg = "there was an error. ";
    if (error instanceof Error) msg += `error : ${error.message}`;
    console.log(msg);
}
