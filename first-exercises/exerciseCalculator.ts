interface resultType {
    totalDays: number;
    trainingDays: number;
    originalTarget: number;
    averageTime: number;
    isTargetReached: boolean;
    rating: 1 | 2 | 3;
    text: string;
}

function calculateExercises(training: number[], target: number): resultType {
    const calcRating = diff(avgArray(training), target);

    const result: resultType = {
        totalDays: training.length,
        trainingDays: training.filter((x) => x !== 0).length,
        originalTarget: target,
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

console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2));
