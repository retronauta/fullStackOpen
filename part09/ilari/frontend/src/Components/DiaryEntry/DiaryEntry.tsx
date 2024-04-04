import { EntryProps } from '../../types';

function DiaryEntry({ entry }: EntryProps) {
  return (
    <>
      <h3>{entry.date}</h3>
      <span>Visibility: {entry.visibility}</span>
      <br />
      <span>Weather: {entry.weather}</span>
    </>
  );
}

export default DiaryEntry;
