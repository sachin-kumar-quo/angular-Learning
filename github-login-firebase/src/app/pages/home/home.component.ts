import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { GithubService } from 'src/app/services/github.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  constructor(
    private ref: ChangeDetectorRef,
    private githubService: GithubService
  ) {}

  ngOnInit(): void {}
  user: any = null;
  userName: string = '';
  error: any = null;
  handleFindUser = () => [
    this.githubService.getUserDetails(this.userName).subscribe({
      next: (user) => {
        this.user = user;
        this.error = null;
        this.ref.detectChanges();
      },
      error: (error) => {
        this.user = null;
        this.error = ' User not Found';
      },
    }),
  ];
}
