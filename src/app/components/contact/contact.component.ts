import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent  {

  name: string = '';
  email: string = '';
  message: string = '';

  onSubmit() {
    alert(`Thank you for your message, ${this.name}!`);
    // Here, you could implement the logic to send the message to your backend service
  }

}
