import express from 'express';
import diaryService from '../services/diaryService';
import toNewDiaryEntry from '../utils';
const router = express.Router();

// Obtener todas las entradas de diario
router.get('/', (_req, res) => {
  res.send(diaryService.getNonSensitiveEntries());
});

// Obtener una entrada en especial
router.get('/:id', (req, res) => {
  const diary = diaryService.findById(Number(req.params.id));

  if (diary) {
    res.send(diary);
  } else {
    res.sendStatus(404);
  }
});

// Postear una entrada de diario
router.post('/', (req, res) => {
  try {
    // toNewDiaryEntry parsea y devuelve un objeto que sera el diary
    const newDiaryEntry = toNewDiaryEntry(req.body);
    // Este servicio nos retorna el objeto como tipo DiaryEntry, nos aniade el id
    const addedEntry = diaryService.addDiary(newDiaryEntry);
    res.json(addedEntry);
  } catch (error: unknown) {
    let errorMessage = '';
    if (error instanceof Error) {
      errorMessage = `Error: ${error.message}`;
    }
    res.status(400).send(errorMessage);
  }
});

export default router;
