import { Injectable } from '@angular/core';
import { Mailgun } from "mailgun-js"
import { NodeMailgun } from 'ts-mailgun';

@Injectable({
  providedIn: 'root'
})
export class MailService {

  constructor() { }

  API_KEY = 'pubkey-3226a4fb225c3e9f83009df0cac6c07d';
  DOMAIN = 'sandboxe59f8c14eda1454ba60558102ceb19f3.mailgun.org';
  
  mailer = new NodeMailgun('pubkey-3226a4fb225c3e9f83009df0cac6c07d', 'sandboxe59f8c14eda1454ba60558102ceb19f3.mailgun.org');
  // mailer.apiKey = 'pubkey-3226a4fb225c3e9f83009df0cac6c07d'; // Set your API key
  // mailer.domain = 'sandboxe59f8c14eda1454ba60558102ceb19f3.mailgun.org'; // Set the domain you registered earlier

  // mailer.fromEmail = 'guillaume.cometto@gmail.com'; // Set your from email
  // mailer.fromTitle = 'My Sample App'; // Set the name you would like to send from
  
  // mailer.init();
  
  // Send an email to test@example.com
  send(){
    this.mailer.apiKey = this.API_KEY; // Set your API key
    this.mailer.domain = this.DOMAIN; // Set the domain you registered earlier

    this.mailer.fromEmail = 'guillaume.cometto@gmail.com'; // Set your from email
    this.mailer.fromTitle = 'My Sample App'; // Set the name you would like to send from

    this.mailer.init();

    this.mailer
      .send('test@example.com', 'Hello!', '<h1>hsdf</h1>')
      .then((result) => console.log('Done', result))
      .catch((error) => console.error('Error: ', error));
    }
  
}
