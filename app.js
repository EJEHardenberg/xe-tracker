jQuery(document).ready(function($) {
function getDOM(responseText){
	var parser = new DOMParser()
	return parser.parseFromString(responseText)
}

function getGithubLatest(user, repo, branch, callback){
	//http://stackoverflow.com/questions/15919635/on-github-api-what-is-the-best-way-to-get-the-last-commit-message-associated-w
	/*
		{
	  	"ref": "refs/heads/master",
	  	"url": "https://api.github.com/repos/EJEHardenberg/green-serv/git/refs/heads/master",
	  	"object": {
		    "sha": "0fd721585cd28487c7be160e53bc5f25b90a5406",
	    	"type": "commit",
	    	"url": "https://api.github.com/repos/EJEHardenberg/green-serv/git/commits/0fd721585cd28487c7be160e53bc5f25b90a5406"
		  }
		}*/
	var firstFetch = "https://api.github.com/repos/"+user+"/"+repo+"/git/refs/heads/" + branch 
	$.getJSON(firstFetch, function(data){
		var secondFetch = data.object.url
		$.getJSON(secondFetch,function(d2){
			callback(d2)
		})
	})
}

$('.latest-commit').each(function(e,t){
	var user = $(t).attr('rel')
	var repo = $(t).attr('data-url')
	var branch = 'master'
	var ref =  t
	getGithubLatest(user, repo, branch, function(data){
		var sha = data.sha
		var author = data.committer.name
		var when = data.committer.date
		var msg = data.message
		var url = data.html_url
		$(ref).append('<li><a href="'+url+'">'+sha+'</a><h3>'+author+'<span class="date">'+when+'</span></h3><p>'+msg+'</p></li>')
	})
})

})