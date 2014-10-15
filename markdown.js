function Markdown(text) {
	function escape($0) {
		return $0.replace(/[\\`#![h*\-_&]/g, function($0) {
			return "&#"+$0.charCodeAt(0)+";";
			});
		};
	function backtick($0, $1, $2) {
		return $1+"<code>"+escape($2)+"</code>";
		};
	return text
		.replace(/\r\n?/g, "\n")
		.replace(/\\t/g, "\t")
		.replace(/&(?!\w+?;)/g, "&amp;")
		.replace(/</g, "&lt;")
		.replace(/>/g, "&gt;")
		.replace(/(^|[^\\])``(.+?)``/g, backtick)
		.replace(/(^|[^\\])`(.+?)`/g, backtick)
		.replace(/\\[\\`#![h*-_]/g, function($0) {
			return "&#"+$0.charCodeAt(1)+";";
			})
		.replace(/&lt;(\/?(?:b|em|h[1-6]|hr|i|s|strong|table|td|th|tr|u))&gt;/g, "<$1>")
		.replace(/^(?:-{3,}|={3,}|_{3,})$/gm, "<hr>\n")
		.replace(/^(#{2,6})(.+)/gm, function($0, $1, $2) {
			return "<h"+$1.length+" id=\""+$2.replace(/[^\w]/g, "")+"\">"+$2+"</h"+$1.length+">";
			})
		.replace(/((?:^ ?&gt; .+?$\n?)+)/gm, function($0, $1) {
			return "<blockquote>"+$1.replace(/^ ?...../gm, "")+"</blockquote>\n";
			})
		.replace(/(?:^ ?- .+?$\n?)+/gm, function($0) {
			$0=$0.split(/\n ?- /);
			$0[0]=$0[0].replace(/^ ?- /, "");
			for(var i=0, $1="<ul>"; i<$0.length; ++i) {
				$1+="<li>"+$0[i];
				if(/^- /.test($0[i+1])) {
					$1+="<ul><li>"+$0[++i].replace(/^- /, "");
					while(/^- /.test($0[i+1])) {
						$1+="</li><li>"+$0[++i].replace(/^- /, "");
						}
					$1+="</li></ul>";
					}
				$1+="</li>";
				}
			return $1+"</ul>\n";
			})
		.replace(/([^\n])\n<(h\d|hr|ul|blockquote)>/g, "$1\n\n<$2>")
		.replace(/<\/(h\d|hr|ul|blockquote)>\n([^\n])/g, "</$1>\n\n$2")
		.replace(/(?:^|\n\n)((?:[^\n<]|<code>)[^]*?)(?=\n\n|$)/g, "<p>$1</p>")
		.replace(/<(hr|\/(?:h\d|ul|blockquote|p))>\n\n/g, "<$1>")
		.replace(/(!)?\[(.*?)\]\(((?:https?:)?(?:\/.+?)|#\w+?)\)/g, function($0, $1, $2, $3) {
			if($3[0]==="#") {
				return "<a href=\""+$3+"\">"+$2+"</a>";
				}
			$3=encodeURI(escape($3));
			if($1) {
				$2=$2.replace(/"/g, "&quot;");
				if(/\.webm$/.test($3)) {
					return "<video src=\""+$3+"\" title=\""+$2+"\" type=\"video/webm\" controls></video>";
					}
				else {
					$2="<img src=\""+$3+"\" title=\""+$2+"\">";
					}
				}
			return "<a href=\""+$3+"\" target=\"_blank\">"+$2+"</a>";
			})
		.replace(/\b(https?:\/\/.+?)([\.\]\)]*(\s|$))/g, function($0, $1, $2) {
			return "<a href=\""+encodeURI(escape($1))+"\" target=\"_blank\">"+$1+"</a>"+$2;
			})
		.replace(/\-\-\-/g, "&mdash;")
		.replace(/\-\-/g, "&ndash;")
		.replace(/\*\*(\S+|\S.+?\S)\*\*/g, "<strong>$1</strong>")
		.replace(/\*(\S+|\S.+?\S)\*/g, "<em>$1</em>")
		.replace(/__(\S+|\S.+?\S)__/g, "<strong>$1</strong>")
		.replace(/(^|\W)-(\S+|\S.+?\S)-(\W|$)/gm, "$1<s>$2</s>$3")
		.replace(/(^|\W)_(\S+|\S.+?\S)_(\W|$)/gm, "$1<em>$2</em>$3")
		.replace(/\n/g, "<br>")
	};
