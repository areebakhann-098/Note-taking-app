import { Component, OnInit } from '@angular/core';
import { NoteService } from '../../services/note.service';
import { Note } from '../../interfaces/note';
import { CommonModule } from '@angular/common';
import { NoteFormComponent } from '../note-form/note-form.component';
import { NgxPaginationModule } from 'ngx-pagination';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, NoteFormComponent, NgxPaginationModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  showForm = false;
  notes: Note[] = [];
  editingNote: Note | null = null;
  viewingNote: Note | null = null;
  successMessage: string = ''; // Message for success notification
  currentPage: number = 1; // Pagination current page
  itemsPerPage: number = 8; // Number of notes per page

  constructor(private noteService: NoteService) {}

  ngOnInit() {
    this.noteService.getNotesObservable().subscribe(notes => {
      this.notes = notes;
    });
  }

  openNoteForm() {
    this.showForm = true;
  }

  closeNoteForm() {
    this.showForm = false;
    this.editingNote = null;
  }

  deleteNote(id: number) {
    this.noteService.deleteNote(id);
    this.successMessage = 'Note deleted successfully!';
    
    // Hide message after 3 seconds
    setTimeout(() => {
      this.successMessage = '';
    }, 3000);
  }

  editNote(note: Note) {
    this.editingNote = { ...note };
    this.showForm = true;
  }

  viewNote(note: Note) {
    this.viewingNote = note;
  }

  closeViewNote() {
    this.viewingNote = null;
  }
}
