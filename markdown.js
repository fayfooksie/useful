function Markdown(text) {
	function escape($0) {
		return $0.replace(/[\\`#![h*\-_]/g, function($0) {
			return "&#"+$0.charCodeAt(0)+";";
			});
		};
	function backtick($0, $1, $2) {
		return $1+"<code>"+escape($2)+"</code>";
		};
	return text
		.replace(/\r\n?/g, "\n")
		.replace(/&(?!\w+?;)/g, "&amp;")
		.replace(/</g, "&lt;")
		.replace(/>/g, "&gt;")
		.replace(/(^|[^\\])``(.+?)``/g, backtick)
		.replace(/(^|[^\\])`(.+?)`/g, backtick)
		.replace(/\\[\\`#![h*-_]/g, function($0) {
			return "&#"+$0.charCodeAt(1)+";";
			})
		.replace(/^(?:-{3,}|={3,}|_{3,})$/gm, "<hr>\n")
		.replace(/^(#{2,6})(.+)/gm, function($0, $1, $2) {
			return "<h"+$1.length+">"+$2+"</h"+$1.length+">";
			})
		.replace(/((?:^ ?&gt; .+?$\n?)+)/gm, function($0, $1) {
			return "<blockquote>"+$1.replace(/^ ?...../gm, "")+"</blockquote>\n";
			})
		.replace(/(?:^ ?[\-*] .+?$\n?)+/gm, function($0) {
			$0=$0.split(/\n/);
			if(!$0[0]) {
				$0.shift();
				}
			while(!$0[$0.length-1]) {
				$0.pop();
				}
			for(var i=0; i<$0.length; ++i) {
				$0[i]=$0[i].replace(/^ ?../, "");
				}
			return "<ul><li>"+$0.join("</li><li>").replace(/-/g, "&dash;")+"</li></ul>\n";
			})
		.replace(/([^\n])\n<(h\d|hr|ul|blockquote)>/g, "$1\n\n<$2>")
		.replace(/<\/(h\d|hr|ul|blockquote)>\n([^\n])/g, "</$1>\n\n$2")
		.replace(/(?:^|\n\n)((?:[^\n<]|<code>)[^]*?)(?=\n\n|$)/g, "<p>$1</p>")
		.replace(/<(hr|\/(?:h\d|ul|blockquote|p))>\n\n/g, "<$1>")
		.replace(/(!)?\[(.*?)\]\((?:https?:)?(\/.+?)\)/g, function($0, $1, $2, $3) {
			$2=$2?$2.replace(/"/g, "&quot;"):"";
			$3=encodeURI(escape($3));
			if($1) {
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
		.replace(/\*\*(\S+|\S.+?\S)\*\*/g, "<b>$1</b>")
		.replace(/\*(\S+|\S.+?\S)\*/g, "<i>$1</i>")
		.replace(/-(\S+|\S.+?\S)-/g, "<s>$1</s>")
		.replace(/__(\S+|\S.+?\S)__/g, "<u>$1</u>")
		.replace(/(^|\W)-(\S+|\S.+?\S)-(\W|$)/gm, "$1<s>$2</s>$3")
		.replace(/(^|\W)_(\S+|\S.+?\S)_(\W|$)/gm, "$1<u>$2</u>$3")
		.replace(/\n/g, "<br>")
	};
