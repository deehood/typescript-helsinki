import diaryData from "../data/diaries";
import { NonSensitiveDiaryEntry, NewDiaryEntry, DiaryEntry } from "../types";

const diaries: Array<DiaryEntry> = diaryData;

const getEntries = (): DiaryEntry[] => {
    return diaries;
};

const findById = (id: number): DiaryEntry | undefined => {
    const entry = diaries.find((d) => d.id === id);
    return entry;
};

const getNonSensitiveEntries = (): NonSensitiveDiaryEntry[] => {
    return diaries.map(({ id, date, weather, visibility }) => ({
        id,
        date,
        weather,
        visibility,
    }));
};

const addDiary = (entries: NewDiaryEntry): DiaryEntry => {
    const newDiaryEntry = {
        id: Math.max(...diaries.map((d) => d.id)) + 1,
        ...entries,
    };

    diaries.push(newDiaryEntry);
    return newDiaryEntry;
};

export default {
    getEntries,
    addDiary,
    getNonSensitiveEntries,
    findById,
};
