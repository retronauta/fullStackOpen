import { useEffect, useState } from 'react';
import { Diary, Info, NewDiary } from './types';
import Diaries from './Components/Diaries/Diaries';
import NewDiaryForm from './Components/NewDiary/NewDiaryForm';
import diaryService from './services/diary';
import axios from 'axios';
import Notification from './Components/Notification/Notification';

function App() {
  const [diaries, setDiaries] = useState<Diary[]>([]);
  const [info, setInfo] = useState<Info>({ message: null });

  // Obteniendo los diarios al cargar la pagina
  useEffect(() => {
    diaryService.getAll().then(data => {
      setDiaries(data);
    });
  }, []);

  const notifyWith = (message: string) => {
    setInfo({ message: message });

    setTimeout(() => {
      setInfo({ message: null });
    }, 5000);
  };

  // Aniadiendo nuevo diario
  const addDiary = async (newDiary: NewDiary) => {
    const data = await diaryService.create(newDiary);
    console.log(data);
    if (axios.isAxiosError(data)) {
      const { response } = data;
      notifyWith(response.data);
    } else {
      const newDiaries = [...diaries, data];
      setDiaries(newDiaries);
    }

    // Promesas
    // diaryService.create(newDiary).then(data => {
    //   setDiaries(diaries.concat(data));
    // });
  };

  return (
    <>
      <h1>Add new entry</h1>
      <Notification info={info} />
      <NewDiaryForm addDiary={addDiary} />
      <Diaries diaries={diaries} />
    </>
  );
}

export default App;
