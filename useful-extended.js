//dom
document.idObject=function() {
	var	object={};
	for(var i=0; i<this.all.length; ++i) {
		if(this.all[i].id) {
			object[
				this.all[i].id.replace(/-./g, function(text) {
					return text[1].toUpperCase();
					})
				]=this.all[i];
			}
		}
	return object;
	};
document.text=function(text) {
	return document.createTextNode(text);
	};
document.create=function(tag, attributes) {
	if(attributes) {
		tag=document.createElement(tag);
		if(attributes.text) {
			tag.textContent=attributes.text;
			delete attributes.text;
			}
		if(attributes.data) {
			for(var key in attributes.data) {
				tag.dataset[key]=attributes.data[key];
				}
			delete attributes.data;
			}
		if(attributes.events) {
			for(var key in attributes.events) {
				tag.addEventListener(key, attributes.events[key]);
				}
			delete attributes.events;
			}
		for(var key in attributes) {
			if(attributes[key]) {
				tag.setAttribute(key, attributes[key]);
				}
			}
		return tag;
		}
	return document.createElement(tag);
	};

//dom.textarea
function grow(event) {
	if(!this.dataset.grow) {
		var	node=this,
			prevheight=node.scrollHeight,
			prevscroll=window.scrollY;
		node.style.height="";
		node.dataset.grow=requestAnimationFrame(function() {
			delete node.dataset.grow;
			var	height=node.scrollHeight+node.offsetHeight-node.clientHeight;
			node.style.height=height+"px";
			if(prevheight===node.scrollHeight) {
				window.scrollTo(window.scrollX, prevscroll);
				}
			else if(node.offsetTop+height-window.scrollY-window.innerHeight>0) {
				window.scrollTo(window.scrollX, prevscroll+node.scrollHeight-prevheight);
				}
			});
		}
	};
function replaceSelection(element, callback) {
	var	caret=element.selectionEnd,
		offset=element.value.length;
	element.value=
		element.value.substring(0, element.selectionStart)+
		callback(element.value.substring(element.selectionStart, element.selectionEnd))+
		element.value.substring(element.selectionEnd, element.value.length);
	caret+=element.value.length-offset;
	element.setSelectionRange(caret, caret);
	};

//date.js
Date.timeAgo=function(time) {
	time=Date.now()-time;
	if(time>31536000000) {
		time=Math.floor(time/31536000000);
		return time+(time===1?" year":" years");
		}
	if(time>2592000000) {
		time=Math.floor(time/2592000000);
		return time+(time===1?" month":" months");
		}
	if(time>604800000) {
		time=Math.floor(time/604800000);
		return time+(time===1?" week":" weeks");
		}
	if(time>86400000) {
		time=Math.floor(time/86400000);
		return time+(time===1?" day":" days");
		}
	if(time>3600000) {
		time=Math.floor(time/3600000);
		return time+(time===1?" hour":" hours");
		}
	if(time>60000) {
		time=Math.floor(time/60000);
		return time+(time===1?" minute":" minutes");
		}
	return Math.floor(time/1000)+"s";
	};

//request.js
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

//useful.js
void function(_, define, desc) {
	"use strict";
	_={
		lastItem: {
			get: function() {
				return this[this.length-1];
				},
			set: function(value) {
				this[this.length-1]=value;
				}
			},
		contains: {
			writable: true,
			configurable: true,
			value: function(item) {
				return this.indexOf(item)!==-1;
				}
			},
		each: {
			writable: true,
			configurable: true,
			value: function(scope, callback) {
				if(!callback) {
					callback=scope;
					scope=this;
					}
				for(var i=0; i<this.length; ++i) {
					callback.call(scope, this[i], i);
					}
				}
			},
		empty: {
			writable: true,
			configurable: true,
			value: function() {
				while(this.length) {
					this.pop();
					}
				}
			},
		fill: {
			writable: true,
			configurable: true,
			value: function(value) {
				for(var i=0; i<this.length; ++i) {
					this[i]=value;
					}
				}
			},
		random: {
			writable: true,
			configurable: true,
			value: function() {
				return this[Math.floor(Math.random()*this.length)];
				}
			},
		remove: {
			writable: true,
			configurable: true,
			value: function(item) {
				for(var i=0; i<this.length; ++i) {
					if(this[i]===item) {
						this.splice(i, 1);
						break;
						}
					}
				}
			},
		set: {
			writable: true,
			configurable: true,
			value: function() {
				for(var i=0; i<arguments.length; ++i) {
					this[i]=arguments[i];
					}
				while(this.length>i) {
					this.pop();
					}
				}
			}
		};
	define(Array.prototype, _);
	define(NodeList.prototype, _);
	define(Object.prototype, {
		extend: {
			writable: true,
			configurable: true,
			value: function(object) {
				for(var key in object) {
					if(object.hasOwnProperty(key)) {
						Object.defineProperty(this, key,
							Object.getOwnPropertyDescriptor(object, key)
							);
						}
					}
				}
			},
		extendFast: {
			writable: true,
			configurable: true,
			value: function(object) {
				for(var key in object) {
					this[key]=object[key];
					}
				}
			}
		});
	define(String.prototype, {
		cut: {
			writable: true,
			configurable: true,
			value: function(match) {
				return this.replace(match, "");
				}
			},
		lower: desc(String.prototype, "toLowerCase"),
		upper: desc(String.prototype, "toUpperCase")
		});
	if("ActiveXObject" in window) {
		define(window, _={
			on: {
				writable: true,
				configurable: true,
				value: function() {
					this.addEventListener.apply(this, arguments);
					}
				},
			off: {
				writable: true,
				configurable: true,
				value: function() {
					this.removeEventListener.apply(this, arguments);
					}
				},
			dispatch: {
				writable: true,
				configurable: true,
				value: function() {
					this.dispatchEvent.apply(this, arguments);
					}
				},
			remove: {
				writable: true,
				configurable: true,
				value: function() {
					this.parentNode.removeChild(this);
					}
				}
			});
		define(Element.prototype, _);
		}
	else {
		define(EventTarget.prototype, _={
			on: desc(EventTarget.prototype, "addEventListener"),
			off: desc(EventTarget.prototype, "removeEventListener"),
			dispatch: desc(EventTarget.prototype, "dispatchEvent")
			});
		if(!window.on) {
			define(window, _);
			}
		}
	define(Element.prototype, {
		append: {
			writable: true,
			configurable: true,
			value: function() {
				for(var i=0; i<arguments.length; ++i) {
					this.appendChild(arguments[i]);
					}
				return this;
				}
			},
		prepend: {
			writable: true,
			configurable: true,
			value: function() {
				for(var i=0; i<arguments.length; ++i) {
					this.insertBefore(arguments[i], this.firstChild);
					}
				return this;
				}
			},
		prependChild: {
			writable: true,
			configurable: true,
			value: function(node) {
				this.insertBefore(node, this.firstChild);
				return node;
				}
			},
		removeAll: {
			writable: true,
			configurable: true,
			value: function(start, end) {
				if(start!==undefined) {
					if(end===undefined) {
						end=this.childNodes.length;
						}
					else if(end>this.childNodes.length) {
						end=this.childNodes.length;
						}
					while(start<end--) {
						this.removeChild(this.childNodes[start]);
						}
					}
				else while(this.firstChild) {
					this.removeChild(this.firstChild);
					}
				return this;
				}
			},
		set: {
			writable: true,
			configurable: true,
			value: function(attribute, value) {
				this.setAttribute(attribute, value||"");
				}
			},
		unset: desc(Element.prototype, "removeAttribute")
		});
	Object.inherit=function(target, parent) {
		target.prototype=Object.create(parent.prototype);
		target.prototype.constructor=parent;
		};
	}(null, Object.defineProperties, Object.getOwnPropertyDescriptor);