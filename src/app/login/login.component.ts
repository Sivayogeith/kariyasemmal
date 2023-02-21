import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  username = '';
  password = '';
  submitted = false;
  errorMessage = '';

  constructor(private loginService: LoginService, private router: Router) {}

  ngOnInit(): void {}

  onSubmit() {
    if (this.username && this.password) {
      this.submitted = true;
      console.log(this.username, this.password);
      this.loginService.login(this.username, this.password).subscribe(
        (response: any) => {
          console.log(response);
          // If the login is successful, you can store the token in localStorage and navigate to the desired page
          localStorage.setItem('token', response.token);
          // Navigate to the desired page
          this.router.navigate(['/']).then(() => {
            location.reload();
          });
        },
        (error: any) => {
          console.log(error);
          this.errorMessage = error.error.error;
        }
      );
    }
  }
}
