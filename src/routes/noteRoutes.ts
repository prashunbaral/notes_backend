import { Router } from 'express';
import { createNote, getAllNotes, getNoteById, deleteNote, updateNote } from '../controllers/noteController';

const router = Router();

router.post('/', createNote);
router.get('/', getAllNotes);
router.get('/:id', getNoteById);
router.delete('/:id', deleteNote);
router.put('/:id', updateNote)

export default router;