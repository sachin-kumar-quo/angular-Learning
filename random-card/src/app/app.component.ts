import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  constructor(private toastr: ToastrService, public userService: UserService) {}
  title = 'random-card';
  ngOnInit() {
    console.log(this.userService);
    this.userService.getUser().subscribe({
      complete: () => {
        this.toastr.success('Successfully loaded data from API');
      },
      error: () => {
        this.toastr.error('Failed to load data from API');
      },
      next: (data: any) => {
        console.log(data);
        this.user = data.results[0];
      },
    });
  }

  changeUser() {
    console.log(this.userService.changeUser());
  }

  user: any;
}
