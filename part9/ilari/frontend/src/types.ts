export interface Diary {
  id: number;
  date: string;
  weather: string;
  visibility: string;
  comment?: string;
}

export type NewDiary = Omit<Diary, 'id'>;

export interface EntryProps {
  entry: Diary;
}

export interface Info {
  message: null | string;
}
