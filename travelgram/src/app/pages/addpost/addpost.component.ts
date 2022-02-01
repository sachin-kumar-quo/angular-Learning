import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { v4 } from 'uuid';
import { readAndCompressImage } from 'browser-image-resizer';
import { imageConfig } from 'src/utils/image.config';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-addpost',
  templateUrl: './addpost.component.html',
  styleUrls: ['./addpost.component.css'],
})
export class AddpostComponent implements OnInit {
  constructor(
    private router: Router,
    private authService: AuthService,
    private db: AngularFireDatabase,
    private storage: AngularFireStorage,
    private toastr: ToastrService
  ) {
    this.authService.getUser().subscribe({
      next: (user: any) => {
        this.db
          .object(`/users/${user.uid}`)
          .valueChanges()
          .subscribe((user) => {
            this.user = user;
          });
      },
    });
  }

  locationName: string = '';
  description: string = '';
  picture: string = '';
  user: any = null;
  uploadPercent: number | undefined = 0;
  ngOnInit(): void {}

  onSubmit = () => {
    const uuid = v4();
    this.db
      .object(`/posts/${uuid}`)
      .set({
        id: uuid,
        locationName: this.locationName,
        description: this.description,
        picture: this.picture,
        by: this.user.name,
        instaId: this.user.instaUsername,
        date: Date.now(),
      })
      .then(() => {
        this.toastr.success('Post Added Successfully');
        this.router.navigateByUrl('/');
      })
      .catch((err) => {
        this.toastr.error('Post failed');
      });
  };

  uploadFile = async (event) => {
    const file = event.target.files[0];
    const resizedImage = await readAndCompressImage(file, imageConfig);
    const filePath = file.name;
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(filePath, resizedImage);
    task.percentageChanges().subscribe({
      next: (percentage) => {
        this.uploadPercent = percentage;
      },
    });
    task
      .snapshotChanges()
      .pipe(
        finalize(() => {
          fileRef.getDownloadURL().subscribe((url) => {
            this.picture = url;
            this.toastr.success('Image uploaded successfully');
          });
        })
      )
      .subscribe();
  };
}
