import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  constructor(private notifier: NotifierService, private router: Router) {}

  email: any = '';
  password: any = '';
  ngOnInit(): void {}

  onsubmit() {
    if (this.email == 'email' && this.password == 'password') {
      this.notifier.notify('success', 'Login Successfully!!');
      this.router.navigateByUrl('post/index');
    } else {
      this.notifier.notify('error', 'Wrong Credentials!');
    }
  }
}
