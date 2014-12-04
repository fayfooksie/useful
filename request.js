function request(url, callback) {
	var	req=new XMLHttpRequest();
	req.open("GET", url, !!callback);
	if(callback) {
		req.onreadystatechange=function() {
			if(req.readyState===4 && req.status===200) {
				callback(req.responseText);
				}
			}
		req.send();
		return req;
		}
	req.send();
	return req.responseText;
	};
request.run=function(url, callback) {
	if(callback) {
		return this(url, function(res) {
			callback(eval("(function() {"+res+"})()"));
			});
		}
	return eval("(function() {"+this(url)+"})()");
	};
request.json=function(url, callback) {
	if(callback) {
		return this(url, function(res) {
			callback(JSON.parse(res));
			});
		}
	return JSON.parse(this(url));
	};
request.buffer=function(url, callback) {
	function parse(string) {
		var	array=new Uint8Array(string.length);
		for(var i=0; i<string.length; ++i) {
			array[i]=string.charCodeAt(i);
			}
		return array.buffer;
		}
	if(callback) {
		return this(url, function(res) {
			callback(parse(res));
			});
		}
	return parse(this(url));
	};