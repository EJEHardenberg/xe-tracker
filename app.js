
function getDOM(responseText){
	var parser = new DOMParser()
	return parser.parseFromString(responseText)
}

