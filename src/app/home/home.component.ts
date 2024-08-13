import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import {
  trigger,
  state,
  style,
  transition,
  animate,
} from '@angular/animations';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  animations: [
    trigger('hoverEffect', [
      state(
        'default',
        style({ transform: 'translateY(0)', boxShadow: 'none' })
      ),
      state(
        'hovered',
        style({
          transform: 'translateY(-10px)',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        })
      ),
      transition('default <=> hovered', animate('300ms ease-in-out')),
    ]),
  ],
})
export class HomeComponent {
  skillState = 'default';

  contact = {
    name: '',
    email: '',
    message: '',
  };

  constructor(private http: HttpClient) {}

  onSubmit() {
    this.http
      .post(
        'https://portfolio-backend-delta-rust.vercel.app/api/contact',
        this.contact
      )
      .subscribe(
        (response) => {
          console.log('Contact information sent successfully', response);
          alert('Your message has been sent!');
          this.contact = { name: '', email: '', message: '' }; // Reset form
        },
        (error) => {
          console.error('There was an error!', error);
          alert('There was an error sending your message.');
        }
      );
  }

  toggleSkillState() {
    this.skillState = this.skillState === 'default' ? 'hovered' : 'default';
  }

  scrollToSection(section: string) {
    const element = document.getElementById(section);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }
}
