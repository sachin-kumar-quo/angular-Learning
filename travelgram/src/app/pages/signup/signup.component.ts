import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { finalize } from 'rxjs/operators';

import { AngularFireStorage } from '@angular/fire/compat/storage';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { imageConfig } from 'src/utils/image.config';
import { readAndCompressImage } from 'browser-image-resizer';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  constructor(
    private router: Router,
    private authService: AuthService,
    private toastr: ToastrService,
    private db: AngularFireDatabase,
    private storage: AngularFireStorage
  ) {}

  picture: string = '../../../assets/img.png';
  uploadPercent: number | undefined = 0;
  ngOnInit(): void {}

  onSubmit = (form: NgForm) => {
    const { email, password, name, bio, country, username } = form.form.value;
    //further validation
    this.authService
      .signup(email, password)
      .then((res) => {
        console.log(res);
        const uid = res.user?.uid;
        this.db.object(`users/${uid}`).set({
          id: uid,
          email,
          name,
          bio,
          country,
          instaUsername: username,
          picture: this.picture,
        });
      })
      .then(() => {
        this.router.navigateByUrl('/');
        this.toastr.success('Signup successful');
      })
      .catch((error) => {
        console.log(error);
        this.toastr.error('Sign Up Failed');
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
          fileRef.getDownloadURL().subscribe({
            next: (url) => {
              this.picture = url;
              this.toastr.success('Image uploaded successfully');
            },
            error: (error) => {
              this.toastr.error('Unable to upload image');
              console.log('Error: ', error);
            },
          });
        })
      )
      .subscribe();
  };
}
