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

    let result: number[] = args.map((value: string, index: number) => {
        console.log(value);

        if (!isNaN(Number(value)) && index > 1) return Number(value);
        // else throw new Error("Only numbers please");
    });
    return result;
};

function calculateExercises(training: number[]): resultType {
    const calcRating = diff(avgArray(training), training[0]);

    const result: resultType = {
        target: training[2],
        totalDays: training.length - 3,
        trainingDays: training.filter((x) => x !== 0).length - 3,
        averageTime: avgArray(training),
        isTargetReached: avgArray(training) < training[2] ? false : true,
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

console.log(calculateExercises(parseArguments2(process.argv)));
