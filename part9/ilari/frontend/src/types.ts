export interface Diary {
  id: number;
  date: string;
  weather: string;
  visibility: string;
}

export interface DiariesProps {
  diaries: Diary[];
}

export interface EntryProps {
  entry: Diary;
}
