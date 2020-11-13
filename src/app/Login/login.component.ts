import { Component, OnInit } from '@angular/core';
import {SocialAuthServiceConfig,SocialAuthService,GoogleLoginProvider} from 'angularx-social-login';
import { Router } from '@angular/router';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
//import * as firebase from 'firebase';
import { AuthService } from '../services/auth.service';
import Swal from 'sweetalert2';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

/**
 * @title Card with multiple sections
 */

@Component({
    selector: 'login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css'],
})
export class Login implements OnInit{
    /*images = [944, 1011, 984].map((n) => `https://picsum.photos/id/${n}/900/500`);
    user:any;
    constructor(
        //private socialServ: SocialAuthService
    ){}

  
*/
matcher = new MyErrorStateMatcher();
  loginForm = new FormGroup({
    email: new FormControl('', Validators.compose([
      Validators.required,
      Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$'),
    ])),
    password: new FormControl('', Validators.required)
  });

  public userRole;
  constructor(
    private router: Router, 
    private AuthService: AuthService, 
    ) { }




  ngOnInit(): void {
    /* if (localStorage.getItem('nickname')) {
      this.router.navigate(['/roomlist']);
    } */
    /* this.loginForm = this.formBuilder.group({
      'nickname': [null, Validators.required]
    }); */
  }

    signIn(platform:string):void{
        platform = GoogleLoginProvider.PROVIDER_ID;
        // this.socialServ.signIn(platform).then((res)=>{
        //     console.log(platform + 'logged is: ',res);

        //     this.user = res;
        // });
    }

  /* onFormSubmit(form: any) {
    const login = form;
    this.ref.orderByChild('nickname').equalTo(login.nickname).once('value', snapshot => {
      if (snapshot.exists()) {
        localStorage.setItem('nickname', login.nickname);
        this.router.navigate(['/roomlist']);
      } else {
        const newUser = firebase.database().ref('users/').push();
        newUser.set(login);
        localStorage.setItem('nickname', login.nickname);
        this.router.navigate(['/roomlist']);
      }
    });
  } */
        async onLogin() {
            const { email, password } = this.loginForm.value;
            console.log('holi');
            try {
            const user = await this.AuthService.login(email, password);
             console.log('estamos aqui 1');
              console.log(user);
            if (user) {
            this.AuthService.isUserAdmin(user.user.uid).subscribe((res)=>
            {
                    console.log('estamos aqui');
        
           
                Swal.fire("Inicio de sesión exitoso.","Ingreso correcto","success");
                this.router.navigate(['home']);
                  
            })
            }
            } catch (error) {
            console.log(error);
            }
        } 
  

}