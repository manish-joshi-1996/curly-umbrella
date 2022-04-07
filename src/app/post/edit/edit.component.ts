import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { Post } from '../post';
import { PostService } from '../post.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css'],
})
export class EditComponent implements OnInit {
  id: any = '';
  post: any = [];
  form = this.formBuilder.group({
    title: new FormControl('', [Validators.required]),
    body: new FormControl('', Validators.required),
  });

  constructor(
    public postService: PostService,
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private notifier: NotifierService
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.params['postId'];
    this.postService.find(this.id).subscribe((data: Post) => {
      this.post = data;
    });
  }

  get f() {
    return this.form.controls;
  }

  submit() {
    console.log(this.form.value);
    this.postService.update(this.id, this.form.value).subscribe((res) => {
      // console.log('Post updated successfully!');
      this.notifier.notify('success', 'Post updated successfully!');
      this.router.navigateByUrl('post/index');
    });
  }
}
