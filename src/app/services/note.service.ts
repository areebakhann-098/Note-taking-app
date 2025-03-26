import { Injectable } from '@angular/core';
import { Note } from '../interfaces/note';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NoteService {
  private notes: Note[] = [];
  private notesSubject = new BehaviorSubject<Note[]>(this.notes);
  private nextId = 1; 

  constructor() {}

  getNotesObservable(): Observable<Note[]> {
    return this.notesSubject.asObservable();
  }

  createNote(note: Note): void {
    note.id = this.nextId++; 
    this.notes.push(note);
    this.notesSubject.next([...this.notes]); 
  }

  updateNote(updatedNote: Note): void {
    this.notes = this.notes.map(note => 
      note.id === updatedNote.id ? updatedNote : note
    );
    this.notesSubject.next([...this.notes]); 
  }

  deleteNote(noteId: number): void {
    this.notes = this.notes.filter(note => note.id !== noteId);
    this.notesSubject.next([...this.notes]); 
  }
}
