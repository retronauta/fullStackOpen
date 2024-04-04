import { useState } from 'react';
import diaryService from '../../services/diary';
import { Diary, Info, NewDiary } from '../../types';
import Notification from '../Notification/Notification';

interface NewDiaryFormProps {
  setDiaries: React.Dispatch<React.SetStateAction<Diary[]>>;
}

function NewDiaryForm({ setDiaries }: NewDiaryFormProps) {
  const [info, setInfo] = useState<Info>({ message: null });
  const [date, setDate] = useState('');
  const [visibility, setVisibility] = useState('');
  const [weather, setWeather] = useState('');
  const [comment, setComment] = useState('');

  const notifyWith = (message: string) => {
    setInfo({ message: message });

    setTimeout(() => {
      setInfo({ message: null });
    }, 5000);
  };

  // const handleWeather = (e: React.FormEvent<HTMLFieldSetElement>) => {
  const handleWeather = (e: React.SyntheticEvent) => {
    setWeather((e.target as HTMLInputElement).value);
  };

  // const handleVisibility = (e: React.FormEvent<HTMLFieldSetElement>) => {
  const handleVisibility = (e: React.SyntheticEvent) => {
    setVisibility((e.target as HTMLInputElement).value);
  };

  const addNewDiary = async (e: React.SyntheticEvent) => {
    e.preventDefault();

    if (!date || !comment || !visibility || !weather) {
      notifyWith('There are empty values, please  fill all fields');
      return;
    }
    const newDiary: NewDiary = {
      date,
      visibility,
      weather,
      comment,
    };

    const responseDiary = await diaryService.create(newDiary);
    setDiaries(prevDiaries => {
      return [...prevDiaries, responseDiary];
    });
    setDate('');
    setVisibility('');
    setWeather('');
    setComment('');
  };

  return (
    <>
      <h1>Add new entry</h1>

      <Notification info={info} />
      <form onSubmit={addNewDiary}>
        <div>
          <label htmlFor="date">Date</label>
          <input
            type="date"
            value={date}
            onChange={event => setDate(event.target.value)}
          />
        </div>
        <fieldset onChange={e => handleVisibility(e)}>
          <p>Visibility:</p>
          <input type="radio" name="visibility" value="great" id="great" />
          <label htmlFor="great">Great</label>
          <input type="radio" name="visibility" value="good" id="good" />
          <label htmlFor="good">Good</label>
          <input type="radio" name="visibility" value="ok" id="ok" />
          <label htmlFor="ok">Ok</label>
          <input type="radio" name="visibility" value="poor" id="poor" />
          <label htmlFor="poor">Poor</label>
        </fieldset>
        <fieldset onChange={e => handleWeather(e)}>
          <p>Weather</p>
          <input type="radio" id="sunny" name="weather" value="sunny" />
          <label htmlFor="sunny">Sunny</label>
          <input type="radio" name="weather" value="rainy" id="rainy" />
          <label htmlFor="rainy">Rainy</label>
          <input type="radio" name="weather" value="cloudy" id="cloudy" />
          <label htmlFor="cloudy">Cloudy</label>
          <input type="radio" name="weather" value="stormy" id="stormy" />
          <label htmlFor="stormy">Stormy</label>
          <input type="radio" name="weather" value="windy" id="windy" />
          <label htmlFor="windy">Windy</label>
        </fieldset>
        <div>
          <label htmlFor="comment">Comment</label>
          <input
            type="text"
            value={comment}
            id="comment"
            onChange={event => setComment(event.target.value)}
          />
        </div>
        <button type="submit">Add</button>
      </form>
    </>
  );
}

export default NewDiaryForm;
