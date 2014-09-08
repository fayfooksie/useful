void function(U, define) {
	U.Array={
		lastItem: {
			get: function() {
				return this[this.length-1];
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
			}
		};
	U.Event={
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
			}
		};
	define(Object.prototype, {
		extend: {
			writable: true,
			configurable: true,
			value: function(object) {
				for(var key in object) {
					Object.defineProperty(this, key,
						Object.getOwnPropertyDescriptor(object, key)
						);
					}
				}
			}
		});
	define(String.prototype, {
		lower: {
			writable: true,
			configurable: true,
			value: function() {
				return this.toLowerCase();
				}
			},
		upper: {
			writable: true,
			configurable: true,
			value: function() {
				return this.toUpperCase();
				}
			}
		});
	define(Array.prototype, U.Array);
	define(NodeList.prototype, U.Array);
	define(window.constructor.prototype, U.Event);
	define(HTMLDocument.prototype, U.Event);
	define(HTMLElement.prototype, U.Event);
	define(HTMLElement.prototype, {
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
		empty: {
			writable: true,
			configurable: true,
			value: function() {
				while(this.firstChild) {
					this.removeChild(this.firstChild);
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
		set: {
			writable: true,
			configurable: true,
			value: function(attribute, value) {
				this.setAttribute(attribute, value||"");
				}
			},
		unset: {
			writable: true,
			configurable: true,
			value: function(attribute) {
				this.removeAttribute(attribute);
				}
			}
		});
	Math.distance=function(x1, y1, x2, y2) {
		return Math.sqrt(Math.pow(x2-x1, 2)+Math.pow(y2-y1, 2));
		};
	Math.distance2=function(x1, y1, x2, y2) {
		return (x2-=x1)*x2+(y2-=y1)*y2;
		};
	}(Object.create(null), Object.defineProperties);