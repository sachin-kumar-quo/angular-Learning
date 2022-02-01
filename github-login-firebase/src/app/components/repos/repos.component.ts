import {
  ChangeDetectorRef,
  Component,
  Input,
  OnInit,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { GithubService } from 'src/app/services/github.service';

@Component({
  selector: 'app-repos',
  templateUrl: './repos.component.html',
  styleUrls: ['./repos.component.css'],
})
export class ReposComponent implements OnInit, OnChanges {
  @Input()
  repoURL: string = '';
  repos = [];
  constructor(private githubService: GithubService) {}

  ngOnInit(): void {}
  ngOnChanges(changes: SimpleChanges): void {
    this.githubService.getRepos(this.repoURL).subscribe({
      next: (repos: any) => {
        this.repos = repos;
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
}
