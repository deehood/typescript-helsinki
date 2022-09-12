function calculateBmi(height: number, weight: number): string {
    const result = weight / (height / 100) ** 2;

    if (result < 18.5) return "underweight";
    if (result > 25) return "overweight";
    return "Normal (healthy weight)";
}
console.log(calculateBmi(180, 74));
