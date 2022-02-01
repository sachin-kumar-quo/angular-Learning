import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  constructor(private toastr: ToastrService, private db: AngularFireDatabase) {
    this.isLoading = true;
    // get all users
    this.db
      .object('/users')
      .valueChanges()
      .subscribe((users: any) => {
        if (users) {
          this.users = Object.values(users);
          this.isLoading = false;
        } else {
          this.toastr.error('No users found');
          this.users = [];
          this.isLoading = false;
        }
      });
    //grab all posts
    this.db
      .object('/posts')
      .valueChanges()
      .subscribe((posts: any) => {
        if (posts) {
          this.posts = Object.values(posts).sort(
            (a: any, b: any) => b.date - a.date
          );
          this.isLoading = false;
        } else {
          this.toastr.error('No posts found');
          this.posts = [];
          this.isLoading = false;
        }
      });
  }

  users: any = [];
  posts: any = [];
  isLoading = false;

  ngOnInit(): void {}
}
