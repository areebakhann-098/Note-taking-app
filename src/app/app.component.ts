import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { HeaderComponent } from './components/header/header.component';
import { HomeComponent } from './components/home/home.component';
import { NoteFormComponent } from './components/note-form/note-form.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';

@Component({
  selector: 'app-root',
  standalone: true, 
  imports: [CommonModule, HeaderComponent, SidebarComponent, HomeComponent, NoteFormComponent], 
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'note-taking-app';
  showForm = false;

  toggleForm() {
    this.showForm = !this.showForm;
  }
}
