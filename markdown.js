function Markdown(text) {
	function backtick(match, text) {
		return "<code>"+text.replace(/./g, function($0) {
			return "&#"+$0.charCodeAt(0)+";";
			})+"</code>";
		};
	return text
		.replace(/&(?!\w+?;)/g, "&amp;")
		.replace(/</g, "&lt;")
		.replace(/>/g, "&gt;")
		.replace(/\\[\\`#![h*-]/g, function($0) {
			return "&#"+$0.charCodeAt(1)+";";
			})
		.replace(/``(.+?)``/g, backtick)
		.replace(/`(.+?)`/g, backtick)
		.replace(/^-{3,}$(?:\r|\n|\r\n)?/gm, "<hr>")
		.replace(/(#{2,6})(.+)/gm, function($0, $1, $2) {
			return "<h"+$1.length+">"+$2+"</h"+$1.length+">";
			})
		.replace(/((?:^\s?&gt;\s.+?$[^]?)+)/gm, function($0, $1) {
			return "<blockquote>"+$1.replace(/^\s?&gt;\s/gm, "")+"</blockquote>";
			})
		.replace(/((?:^\s?[-*]\s.+?$[^]?)+)/gm, function($0, $1) {
			$1=$1.split(/\n/);
			if(!$1[0]) $1.shift();
			while(!$1[$1.length-1]) $1.pop();
			for(var i=0; i<$1.length; ++i) {
				$1[i]=$1[i].replace(/^\s?[-*]\s/, "");
				}
			return "<ul><li>"+$1.join("</li><li>").replace(/-/g, "&dash;")+"</li></ul>";
			})
		.replace(/(?:\r|\n|\r\n)?(<\/?(h\d|ul|li|blockquote)>)(?:\r|\n|\r\n){0,2}/g, "$1")
		.replace(/(!)?\[(.*?)\]\(((?:https?:\/)?\/.+?)\)/g, function($0, $1, $2, $3) {
			$3="&#"+$3.charCodeAt(0)+";"+$3.slice(1);
			$2=$2?$2.replace(/"/g, "&quote;"):"";
			if($1) {
				if(/\.webm$/.test($3)) {
					return "<video src=\""+encodeURI($3)+"\" title=\""+$2+"\" type=\"video/webm\" controls></video>";
					}
				else {
					$2="<img src=\""+encodeURI($3)+"\" title=\""+$2+"\">";
					}
				}
			return "<a href=\""+encodeURI($3)+"\" target=\"_blank\">"+$2+"</a>";
			})
		.replace(/\b(https?:\/\/.+?)([\.\]\)]*(\s|$))/g, function($0, $1, $2) {
			return "<a href=\""+encodeURI($1)+"\" target=\"_blank\">"+$1+"</a>"+$2;
			})
		.replace(/\*\*(.+?)\*\*/g, "<b>$1</b>")
		.replace(/\*(.+?)\*/g, "<i>$1</i>")
		.replace(/(^|[^\w])_(\w.+?)_(?!\w)/g, "$1<u>$2</u>")
		.replace(/(^|[^\w])-(\w.+?)-(?!\w)/g, "$1<s>$2</s>")
		.replace(/\-\-\-/g, "&mdash;")
		.replace(/\-\-/g, "&ndash;");
	};
