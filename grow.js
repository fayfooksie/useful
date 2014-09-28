/*
	textarea.on("keypress", grow);
	grows and shrinks to fit content
	respects default col height
	scrolls appropriate distance on viewport overflow
*/
function grow(event) {
	var	node=this,
		prevheight=node.scrollHeight,
		prevscroll=window.scrollY;
	node.style.height="";
	requestAnimationFrame(function() {
		var	height=node.scrollHeight+node.offsetHeight-node.clientHeight;
		node.style.height=height+"px";
		if(prevheight===node.scrollHeight) {
			window.scrollTo(window.scrollX, prevscroll);
			}
		else if(node.offsetTop+height-window.scrollY-window.innerHeight>0) {
			window.scrollTo(window.scrollX, prevscroll+node.scrollHeight-prevheight);
			}
		});
	};
