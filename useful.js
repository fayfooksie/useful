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
	if(!window.EventTarget) {
		define(Window.prototype, _={
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
		define(HTMLDocument.prototype, _);
		}
	else {
		define(EventTarget.prototype, _={
			on: desc(EventTarget.prototype, "addEventListener"),
			off: desc(EventTarget.prototype, "removeEventListener"),
			dispatch: desc(EventTarget.prototype, "dispatchEvent")
			});
		if(!(window instanceof EventTarget)) {
			define(Window.prototype, _);
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
		parent: {
			configurable: true,
			get: function() {
				return this.parentNode;
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