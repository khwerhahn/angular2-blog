/// <reference path="typings/angular2/angular2.d.ts" />

import {
	Component,
	For,
	View,
	bootstrap,
} from "angular2/angular2";

class Article {
	title: string;
	link: string;
	votes: number;

	constructor(title,link){
		this.title = title;
		this.link = link;
		this.votes = 0;
	}

	domain(){
		var link = this.link.split('//')[1];
		return link.split('/')[0];
	}

	voteUp() {
	 this.votes += 1;
	 return false;
	}

	voteDown() {
	 this.votes -= 1;
	 return false;
	}

}

@Component({
	selector: 'reddit-article',
	properties: {
		'article': 'article'
	}
})
@View({
	template: `
    <article>
      <div class="votes">{{ article.votes }}</div>
      <div class="main">
        <h2>
         <a href="{{ article.link }}">{{ article.title }}</a> <span> ({{ article.domain() }}) </span>
       </h2>
       <ul>
         <li><a href (click)='article.voteUp()'>upvote</a></li>
         <li><a href (click)='article.voteDown()'>downvote</a></li>
       </ul>
     </div>
   </article>
   `
})
class RedditArticle {
}


@Component({
	selector: 'reddit'
})
@View({
	template: `
     <section class="new-link">
       <div class="control-group">
         <div><label for="title">Title:</label></div>
         <div><input name="title" #newtitle></div>
       </div>
       <div class="control-group">
         <div><label for="link">Link:</label></div>
         <div><input name="link" #newlink></div>
       </div>
 
       <button (click)="addArticle(newtitle,newlink)">Submit Link</button>
     </section>
     <reddit-article *for="#article of articles" [article]="article"></reddit-article> 
   `,
   directives: [RedditArticle, For]


	
})
class RedditApp {
	articles: Array<Article>;

	constructor(){
		this.articles = [
			new Article('Angular 2', 'Angular 2 rocks and is pretty easy to use... '),
			new Article('Angular 1', 'It was nice to work with you...')
		]
	}
	
	addArticle(title, link){
		this.articles.push(new Article(title.value,link.value));
		title.value = '';
		link.value = '';
		console.log("Adding article with title", title.value, "and link", link.value);
	}
}



bootstrap(RedditApp);