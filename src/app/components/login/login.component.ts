import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { LoginService } from '../../services/login.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit{

  public loginForm!:FormGroup;
  constructor(private loginService:LoginService,private route:Router){}



  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email:new FormControl('',[Validators.required,Validators.email]),
      password:new FormControl('',[Validators.required])
    }

    )
  }

  onSubmit(){
    this.loginService.login(this.loginForm.value).subscribe({
      next:(response)=>{
        console.log('Response from User service ',response);
        Swal.fire({
          title: "Login successful",
          icon: "success"
        });
        this.route.navigate(['/dashboard'])

      },
      error:(err)=>{
        // Extract error message from response
    let errorMessage = 'An unexpected error occurred';
    if(err.message === 'BAD Request'){
      errorMessage = 'you have entered a wrong password';
    }
    else if(err.message === 'Invalid Credentials'){
      errorMessage = 'UserName or passowrd is incorrect';
    }
    else if(err.message === 'account is not active'){
      errorMessage = 'UserName or passowrd is incorrect or Account is not active';

    }
    

      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: errorMessage,
        footer: '<a id="help-link" href="/help/auth-help">See details</a>'
      });
    }
  });
  

    
  }


}
