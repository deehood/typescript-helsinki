import { NewDiaryEntry, Visibility, Weather } from "./src/types";

const isString = (text: unknown): text is string => {
    return typeof text === "string" || text instanceof String;
};

const parseComment = (comment: unknown): string => {
    console.log("parse", comment);

    if (!comment || !isString(comment)) {
        throw new Error("incorrect or missing comment");
    }
    return comment;
};

const isDate = (date: string): boolean => Boolean(Date.parse(date));

const parseDate = (date: unknown): string => {
    if (!date || !isString(date) || !isDate(date)) {
        throw new Error("incorrect or missing date: " + date);
    }
    return date;
};
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isWeather = (param: any): param is Weather => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    return Object.values(Weather).includes(param);
};

const parseWeather = (weather: unknown): Weather => {
    if (!weather || !isWeather(weather)) {
        throw new Error("incorrect or missing weather: " + weather);
    }
    return weather;
};
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isVisibility = (param: any): param is Visibility => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    return Object.values(Visibility).includes(param);
};

const parseVisibility = (visibility: unknown): Visibility => {
    if (!visibility || !isVisibility(visibility)) {
        throw new Error("Incorrect or missing visibility");
    }
    return visibility;
};

// type Fields = {
//     comment: unknown;
//     date: unknown;
//     weather: unknown;
//     visibility: unknown;
// };
const toNewDiaryEntry = (
    //     {
    //     comment,
    //     date,
    //     weather,
    //     visibility,
    // }: Fields
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    obj: any
): NewDiaryEntry => {
    // console.log("object", obj);
    console.log(obj.comment);

    const newEntry: NewDiaryEntry = {
        comment: parseComment(obj.comment),
        date: parseDate(obj.date),
        weather: parseWeather(obj.weather),
        visibility: parseVisibility(obj.visibility),
    };
    console.log("newEntry", newEntry);

    return newEntry;
};

export default toNewDiaryEntry;
