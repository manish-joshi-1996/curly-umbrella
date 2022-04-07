import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { Post } from '../post';
import { PostService } from '../post.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css'],
})
export class IndexComponent implements OnInit {
  posts: Post[] = [];
  page = 1;
  pageSize = 10;

  constructor(
    public postService: PostService,
    private notifier: NotifierService,
    private route: Router
  ) {}

  ngOnInit(): void {
    this.postService.getAll().subscribe((data: Post[]) => {
      this.posts = data;
      console.log(this.posts);
    });
  }

  deletePost(id: number) {
    this.postService.delete(id).subscribe((res) => {
      this.posts = this.posts.filter((item) => item.id !== id);
      console.log('Post deleted successfully!');
      this.notifier.notify('success', 'Post deleted successfully!');
    });
  }

  logout() {
    this.notifier.notify('success', 'Logout Successfully!!');
    this.route.navigateByUrl('/login');
  }
}
