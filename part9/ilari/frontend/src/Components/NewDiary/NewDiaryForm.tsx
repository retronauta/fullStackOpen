import { useState } from 'react';
import { NewDiaryFormProps } from '../../types';

function NewDiaryForm({ addDiary }: NewDiaryFormProps) {
  const [date, setDate] = useState('');
  const [visibility, setVisibility] = useState('');
  const [weather, setWeather] = useState('');
  const [comment, setComment] = useState('');

  // Agregando nueva entrada de diario
  const newDiary = (event: React.SyntheticEvent) => {
    event.preventDefault();
    const diary = {
      date,
      visibility,
      weather,
      comment,
    };
    addDiary(diary);
    setComment('');
    setDate('');
    setVisibility('');
    setWeather('');
  };

  return (
    <>
      <form onSubmit={newDiary}>
        Date:
        <input
          type="text"
          value={date}
          onChange={event => setDate(event.target.value)}
        />
        <br />
        Visibility:
        <input
          type="text"
          value={visibility}
          onChange={event => setVisibility(event.target.value)}
        />
        <br />
        Weather:
        <input
          type="text"
          value={weather}
          onChange={event => setWeather(event.target.value)}
        />
        <br />
        Comment:
        <input
          type="text"
          value={comment}
          onChange={event => setComment(event.target.value)}
        />
        <br />
        <button type="submit">Add</button>
      </form>
    </>
  );
}

export default NewDiaryForm;
