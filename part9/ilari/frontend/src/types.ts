export interface Diary {
  id: number;
  date: string;
  weather: string;
  visibility: string;
}

export interface NewDiary {
  date: string;
  weather: string;
  visibility: string;
  comment: string;
}

export interface DiariesProps {
  diaries: Diary[];
}

export interface EntryProps {
  entry: Diary;
}

export interface NewDiaryFormProps {
  addDiary: (newDiary: NewDiary) => void;
}
