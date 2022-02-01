import { Component, Input, OnInit, OnChanges } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import {
  faShareSquare,
  faThumbsDown,
  faThumbsUp,
} from '@fortawesome/free-regular-svg-icons';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css'],
})
export class PostComponent implements OnInit, OnChanges {
  constructor(
    private authService: AuthService,
    private db: AngularFireDatabase
  ) {
    this.authService.getUser().subscribe((user) => {
      this.uid = user?.uid;
    });
  }

  uid: any = null;
  upvote = 0;
  downvote = 0;
  @Input() post: any;
  faShareSquare = faShareSquare;
  faThumbsUp = faThumbsUp;
  faThumbsDown = faThumbsDown;

  ngOnInit(): void {}

  ngOnChanges(): void {
    if (this.post.vote) {
      Object.values(this.post.vote).forEach((vote: any) => {
        if (vote.upvote) {
          this.upvote++;
        }
        if (vote.downvote) {
          this.downvote++;
        }
      });
    }
  }

  upVotePost = () => {
    console.log('UpVoting');
    this.db.object(`/posts/${this.post.id}/vote/${this.uid}`).set({
      upvote: 1,
    });
  };
  downVotePost = () => {
    console.log('DownVoting');
    this.db.object(`/posts/${this.post.id}/vote/${this.uid}`).set({
      downvote: 1,
    });
  };

  getInstURL = () => {
    return `https://www.instagram.com/${this.post.instaId}`;
  };
}
