import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Title} from '@angular/platform-browser';

import { UsersService } from 'src/app/shared/services/users.service';
import { Message } from 'src/app/shared/models/message.model';
import { AuthService } from 'src/app/shared/services/auth.service';

import { fadeStateTrigger } from 'src/app/shared/aminations/fade.animation';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  animations: [fadeStateTrigger]
})
export class LoginComponent implements OnInit {

    form: FormGroup;
    message: Message;
    
  constructor(
    private usersService: UsersService,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private title: Title
    ) { 
      title.setTitle('Вход в систему');
    }

  ngOnInit() {
    this.message = new Message('danger', '');
    
    this.route.queryParams.subscribe((params: Params) => {
      if(params['nowCanLogin']) {
        this.showMessage('Теперь вы можете зайти в систему', 'success')
      } else if(params['accessDenied']) {
        this.showMessage('Чтобы зайти в систему, нужно ввести логин и пароль', 'warning')
      }
   })
    
    this.form = new FormGroup({
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'password': new FormControl(null, [Validators.required, Validators.minLength(3)])    })
  }

  private showMessage(text: string, type: string = 'danger') {
    this.message = new Message(type, text);
    setTimeout(()=> {
      this.message.text = '';
    }, 5000)
  }

  onSubmit() {
    const formData = this.form.value;
    
    this.usersService.getUserByEmail(formData.email)
      .subscribe((user)=> {
      if (user) {
          if(user.password === formData.password) {
            this.message.text = '';
            localStorage.setItem('user', JSON.stringify(user));
            this.authService.login();   
            this.router.navigate(['/system', 'bill']);         
          } else {
            this.showMessage('Пароль не верный!')
          }
      } else {
        this.showMessage('Такого пользователя нет!')
      }
    });    
  }

}
