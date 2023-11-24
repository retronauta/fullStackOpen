import { useEffect, useState } from 'react';
import { Diary, NewDiary } from './types';
import Diaries from './Components/Diaries/Diaries';
import diaryService from './services/diary';
import NewDiaryForm from './Components/NewDiary/NewDiaryForm';

function App() {
  const [diaries, setDiaries] = useState<Diary[]>([]);

  // Obteniendo los diarios al cargar la pagina
  useEffect(() => {
    diaryService.getAll().then(data => {
      setDiaries(data);
    });
  }, []);

  // Aniadiendo nuevo diario
  const addDiary = (newDiary: NewDiary) => {
    diaryService.create(newDiary).then(data => {
      setDiaries(diaries.concat(data));
    });
  };

  return (
    <>
      <NewDiaryForm addDiary={addDiary} />
      <Diaries diaries={diaries} />
    </>
  );
}

export default App;
