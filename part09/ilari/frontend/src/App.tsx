import { useEffect, useState } from 'react';
import { Diary } from './types';
import Diaries from './Components/Diaries/Diaries';
import NewDiaryForm from './Components/NewDiary/NewDiaryForm';
import diaryService from './services/diary';

function App() {
  const [diaries, setDiaries] = useState<Diary[]>([]);

  // Obteniendo los diarios al cargar la pagina
  useEffect(() => {
    const fetchDiaries = async () => {
      const data = await diaryService.getAll();
      setDiaries(data);
    };

    fetchDiaries();
  }, []);

  return (
    <>
      <NewDiaryForm setDiaries={setDiaries} />
      <Diaries diaries={diaries} />
    </>
  );
}

export default App;
