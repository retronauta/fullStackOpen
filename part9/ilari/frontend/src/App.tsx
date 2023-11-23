import { useEffect, useState } from 'react';
import { Diary } from './types';
import { getAllDiaries } from './services';
import DiariesArr from './Components/Diaries/Diaries';

function App() {
  const [diaries, setDiaries] = useState<Diary[]>([]);

  // Obteniendo los diarios al cargar la pagina
  useEffect(() => {
    getAllDiaries().then(data => {
      setDiaries(data);
    });
  }, []);

  return (
    <>
      <DiariesArr diaries={diaries} />
    </>
  );
}

export default App;
