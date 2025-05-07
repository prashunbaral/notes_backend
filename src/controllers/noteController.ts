import { Request, Response } from 'express';
import pool from '../db/config';
import { Note, CreateNoteDTO } from '../types/note';
import { title } from 'process';

export const createNote = async (req: Request, res: Response) => {
  try {
    const { title, content }: CreateNoteDTO = req.body;
    const result = await pool.query(
      'INSERT INTO notes (title, content) VALUES ($1, $2) RETURNING*',
      [title, content]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: 'Error creating note' });
  }
};

export const getAllNotes = async (req: Request, res: Response) => {
  try {
    const result = await pool.query('SELECT * FROM notes ORDER BY created_at DESC');
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching notes' });
  }
};

export const getNoteById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result = await pool.query('SELECT * FROM notes WHERE id = $1', [id]);
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Note not found' });
    }
    
    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching note' });
  }
};

export const deleteNote = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result = await pool.query('DELETE FROM notes WHERE id = $1 RETURNING *', [id]);
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Note not found' });
    }
    
    res.json({ message: 'Note deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error deleting note' });
  }
}; 

export const updateNote = async (req: Request, res: Response) => {
  try{
    const {id} = req.params;
    const {title, content} = req.body;
    // console.log(res);
    const result = await pool.query('UPDATE notes SET title = $2, content = $3 WHERE id = $1 RETURNING *', [id, title, content]);
    console.log(result);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Note not found' });
    }
    return res.json({ message: 'Note updated successfully' });
  }catch(error){
    console.error(error);
  }
}