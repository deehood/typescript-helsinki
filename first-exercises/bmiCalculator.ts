interface inputValues {
    value1: number;
    value2: number;
}

export const parseArguments = (args: string[]): inputValues => {
    console.log(args);

    if (args.length < 1) throw new Error("welcome please give me numbers");
    if (args.length < 2) throw new Error("not enough arguments");
    if (args.length > 2) throw new Error("too many arguments");
    if (isNaN(Number(args[0])) || isNaN(Number(args[1])))
        throw new Error("i need numbers");
    if (Number(args[0]) > 0 && Number(args[1]) > 0)
        return { value1: Number(args[0]), value2: Number(args[1]) };
    throw new Error("i need positive numbers");
};

export function calculateBmi(height: number, weight: number): string {
    const result = weight / (height / 100) ** 2;

    if (result < 18.5) return "underweight";
    if (result > 25) return "overweight";
    return "Normal (healthy weight)";
}

try {
    const { value1, value2 } = parseArguments(process.argv.slice(2));
    console.log(calculateBmi(value1, value2));
} catch (error) {
    let msg = "Hey, ";
    if (error instanceof Error) msg += error.message;
    console.log(msg);
}
