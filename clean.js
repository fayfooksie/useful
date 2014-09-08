window.addEventListener("load", function(event) {
	var	node=null,
		iterator=document.createNodeIterator(document, NodeFilter.SHOW_TEXT, null, false);
	while(node=iterator.nextNode()) {
		if(/^\s*$/.test(node.data)) {
			node.parentNode.removeChild(node);
			}
		}
	});