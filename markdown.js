function Markdown(text) {
	function backtick(match, text) {
		return "<code>"+text.replace(/./g, function(match) {
			return "&#"+match.charCodeAt(0)+";";
			})+"</code>";
		};
	return text
		.replace(/&/g, "&amp;")
		.replace(/</g, "&lt;")
		.replace(/>/g, "&gt;")
		.replace(/\\./g, function(match) {
			return "&#"+match.charCodeAt(1)+";";
			})
		.replace(/``(.+?)``/g, backtick)
		.replace(/`(.+?)`/g, backtick)
		.replace(/(?:\r?\n)?((?:^\s?[-*]\s.+?$[^]?)+)(?:\r?\n){0,2}/gm, function(match, list) {
			list=list.split(/\n/);
			if(!list[0]) list.shift();
			while(!list[list.length-1]) list.pop();
			for(var i=0; i<list.length; ++i) {
				list[i]=list[i].replace(/^\s?[-*]\s/, "");
				}
			return "<ul><li>"+list.join("</li><li>").replace(/-/g, "&dash;")+"</li></ul>";
			})
		.replace(/(!)?\[(.*?)\]\(((?:https?:\/)?\/.+?)\)/g, function(match, i, text, url) {
			url="&#"+url.charCodeAt(0)+";"+url.slice(1);
			text=text?text.replace(/"/g, "&quote;"):"";
			if(i) {
				if(/\.webm$/.test(url)) {
					return "<video src=\""+encodeURI(url)+"\" title=\""+text+"\" type=\"video/webm\" controls></video>";
					}
				else {
					text="<img src=\""+encodeURI(url)+"\" title=\""+text+"\">";
					}
				}
			return "<a href=\""+encodeURI(url)+"\" target=\"_blank\">"+text+"</a>";
			})
		.replace(/\b(https?:\/\/.+?)([\.\]\)]*(\s|$))/g, function(match, url, suffix) {
			return "<a href=\""+encodeURI(url)+"\" target=\"_blank\">"+url+"</a>"+suffix;
			})
		.replace(/\*\*(.+?)\*\*/g, "<b>$1</b>")
		.replace(/\*(.+?)\*/g, "<i>$1</i>")
		.replace(/(^|[^\w])_(\w.+?)_(?!\w)/g, "$1<u>$2</u>")
		.replace(/(^|[^\w])-(\w.+?)-(?!\w)/g, "$1<s>$2</s>")
		.replace(/\-\-\-/g, "&mdash;")
		.replace(/\-\-/g, "&ndash;");
	};
