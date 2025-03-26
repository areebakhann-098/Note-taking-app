import { Component, Output, EventEmitter, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NoteService } from '../../services/note.service';
import { Note } from '../../interfaces/note';

@Component({
  selector: 'app-note-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './note-form.component.html',
  styleUrls: ['./note-form.component.css']
})
export class NoteFormComponent implements OnInit {
  noteForm!: FormGroup;
  @Input() note: Note | null = null;
  @Output() formClosed = new EventEmitter<void>();
  @Output() noteSaved = new EventEmitter<Note>(); // Emit saved note
  successMessage: string | null = null;

  constructor(private formBuilder: FormBuilder, private noteService: NoteService) {}

  ngOnInit(): void {
    this.noteForm = this.formBuilder.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      content: ['', [Validators.required, Validators.minLength(5)]]
    });

    if (this.note) {
      this.noteForm.patchValue(this.note);
    }
  }

  onSubmit(): void {
    if (this.noteForm.invalid) return;

    let savedNote: Note;
    
    if (this.note) {
      savedNote = { ...this.note, ...this.noteForm.value };
      this.noteService.updateNote(savedNote);
    } else {
      savedNote = { id: Date.now(), ...this.noteForm.value }; 
      this.noteService.createNote(savedNote);
    }

    this.successMessage = 'Note added successfully!';
    this.noteSaved.emit(savedNote); 
    this.noteForm.reset();

    setTimeout(() => {
      this.successMessage = null;
      this.formClosed.emit();
    }, 2000); 
  }

  closeForm(): void {
    this.formClosed.emit();
  }
}
