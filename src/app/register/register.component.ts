import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RegisterService } from '../services/register.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  username = '';
  password = '';
  confirmPassword = '';
  email = '';
  errorMessage = '';
  submitted = false;

  constructor(
    private registerService: RegisterService,
    private router: Router
  ) {}

  ngOnInit() {}

  onSubmit() {
    this.submitted = true;
    console.log(this.username, this.password, this.email);
    if (this.confirmPassword !== this.password) {
      this.errorMessage = "The passwords don't match!";
    } else {
      this.registerService
        .register(this.username, this.password, this.email)
        .subscribe(
          (response: any) => {
            console.log(response);
            localStorage.setItem('token', response.token);

            this.router.navigate(['/']).then(() => {
              location.reload();
            });
          },
          (error: any) => {
            console.log(error);
            this.errorMessage = error.error.message;
          }
        );
    }
  }
}
