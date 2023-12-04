import { Diary } from '../../types';
import DiaryEntry from '../DiaryEntry/DiaryEntry';

interface DiariesProps {
  diaries: Diary[];
}

function Diaries({ diaries }: DiariesProps) {
  return (
    <>
      <h1>Diary entries</h1>
      {diaries.map(diary => (
        <DiaryEntry entry={diary} key={diary.id} />
      ))}
    </>
  );
}

export default Diaries;
