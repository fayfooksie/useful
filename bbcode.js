function BBCode(text) {
	return text
		.replace(/</g, "&lt;")
		.replace(/>/g, "&gt;")
		.replace(/\\\[/g, "&#91;")
		.replace(/\[code\](.+?)\[\/code\]/ig, function($0, $1) {
			return "<code>"+$1
				.replace(/\[/g, "&#91;")
				.replace(/http/g, "&#104;ttp")
				+"</code>";
			})
		.replace(/\[hr\]\r?\n?/ig, "<hr>")
		.replace(/\[(\/?(?:b|h[1-6]|i|s|u))\]/ig, "<$1>")
		.replace(/\r?\n?\[(\/?(?:center|table|td|th|tr))\]\r?\n?/ig, "<$1>")
		.replace(/\[(\/)?quote\]/ig, "<$1blockquote>")
		.replace(/\[img\](?!javascript:)(.+?)\[\/img\]/ig, function($0, $1) {
			return "<img src=\""+encodeURI($1)+"\">";
			})
		.replace(/\[url(?:=(?!javascript:)(.+?))?\](.+?)\[\/url\]/ig, function($0, $1, $2) {
			if($1) {
				$1=$1.replace(/^h/, "&#104;");
				}
			else {
				$2=$2.replace(/^h/, "&#104;");
				$1=$2.replace(/^javascript:/, "");
				}
			return "<a href=\""+encodeURI($1)+"\" target=\"_blank\">"+$2+"</a>";
			})
		.replace(/\[(left|right|spoiler)\]/ig, "<span class=\"$1\">")
		.replace(/\[\/(?:left|right|spoiler)\]/ig, "</span>")
		.replace(/(^|\s|\(|\[)(https?:\/\/.+?)([\.\]\)]*(?:\s|$))/g, function($0, $1, $2, $3) {
			return $1+"<a href=\""+encodeURI($2)+"\" target=\"_blank\">"+$2+"</a>"+$3;
			})
		.replace(/\r?\n/g, "<br>");
	};
