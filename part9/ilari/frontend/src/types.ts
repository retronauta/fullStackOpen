export interface Diary {
  id: number;
  date: string;
  weather: string;
  visibility: string;
  comment?: string;
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

export interface ValidationError {
  message: string;
  errors: Record<string, string[]>;
}

export interface Info {
  message: null | string;
}

export interface NotificationProps {
  info: Info;
}
