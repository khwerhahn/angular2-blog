/// <reference path="typings/angular2/angular2.d.ts" />

import {
	Component,
	For,
	View,
	bootstrap,
} from "angular2/angular2";

@Component({
	selector: 'menu-bar'
})
@View({
	template: `
	 <nav class="navbar navbar-inverse navbar-fixed-top">
      <div class="container">
        <div class="navbar-header">
          <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
            <span class="sr-only">Toggle navigation</span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
          </button>
          <a class="navbar-brand" href="#">{{ title }}</a>
        </div>
        <div id="navbar" class="collapse navbar-collapse">
          <ul class="nav navbar-nav">
            <li class="active"><a href="#">Home</a></li>
            <li><a href="#about">About</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
        </div>
      </div>
    </nav>
	`
})
class MenuBar {
	title: string;

	constructor(){
		this.title = 'Blog';
	}

}

class Post {
	title: string;
	text: string;
	created: Date;
	votes: number;

	constructor(title, text) {
		this.title = title || '';
		this.text = text;
		this.votes = 0;
		this.created = new Date();
	}

	voteUp() {
		this.votes += 1;
		return false;
	}

	voteDown() {
		if (this.votes <= 0) {
			this.votes = 0;
		}
		else {
			this.votes -= 1;
		}
		return false;
	}

}

@Component({
	selector: 'blog-post',
	properties: {
		'post': 'post'
	}
})
@View({
	template: `
	<div class="row">
		<div class="col-lg-8 col-lg-offset-2">
			<div class="bs-component">
				<div class="panel panel-default">
					<div class="panel-heading">{{ post.title }}</div>
					<div class="panel-body">{{ post.text }}</div>
					<div class="panel-footer" style="background-color:#fff">
						<div class="row">
							<div class="col-lg-6">
								Votes: {{ post.votes }}
							</div>
							<div class="col-lg-6">
								<div class="bs-component">
									<div class="pull-right">
									<a class="btn btn-default" href (click)='post.voteUp()'>Upvote</a>
									<a class="btn btn-default" href (click)='post.voteDown()'>Downvote</a>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
	`
})
class BlogPost {

}




@Component({
	selector: 'blog-content'
})
@View({
	template: `
	<div class="container" style="margin-top:100px">
		<div class="row">
			<div class="col-lg-8 col-lg-offset-2">
				<div class="bs-component">
				<div class="panel panel-default">
	                <div class="panel-body">
	                	<form class="form-horizontal">
	                		<h5>Write something creative</h5>
							<fieldset>
								<div class="form-group">
									<div class="col-lg-12">
										<label class="control-label" for="inputText">Title</label>
										<input type="text" class="form-control" id="inputText" name="inputText" #title>
									</div>
								</div>
								<div class="form-group">
									<div class="col-lg-12">
										<label class="control-label" for="inputText">Post</label>
										<textarea rows="2" class="form-control" id="inputText" name="inputText" #text></textarea>
									</div>
								</div>
								<button (click)="addPost(title,text)" type="button" class="btn btn-primary pull-right">Post</button>
							</fieldset>
	                	</form>
	                  
	                </div>
	              </div>
				</div>
			</div>
		</div>
		<blog-post *for="#post of posts" [post]="post"></blog-post> 
    </div>
	`,
	directives: [BlogPost , For]

})
class BlogContent{
	posts: Array<Post>;

	constructor() {
		this.posts = [
			new Post('Angular 2', 'Angular 2 rocks and is pretty easy to use... '),
		]
	}

	addPost(title, text) {
		this.posts.push(new Post(title.value, text.value));
		title.value = '';
		text.value = '';
	}
}




@Component({
	selector: 'blog'
})
@View({
	template: `
	<menu-bar></menu-bar>
	<blog-content></blog-content>
	`,
	directives: [MenuBar, BlogContent]

	
})
class BlogApp {
	
}



bootstrap(BlogApp);