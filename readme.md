#clean.js
Removes all whitespace `\s*` from DOM.

#useful.js
Various utility functions and pleasant aliases. Should work fine on all modern browsers.

###Object
- `.inherit(target, parent)` - inherit prototype of parent

###Object.prototype
- `.extend(object)` - copy all property descriptors (get, set)
- `.extendFast(object)` - copy keys only

###Array.prototype, NodeList.prototype
- `.lastItem` - get/set last item
- `.contains(item)` - returns boolean
- `.each([this, ]callback)` - alternative forEach()
- `.empty()` - remove all items (retain properties)
- `.fill(value)` - set all items to value
- `.random()` - return random item
- `.remove(item)` - remove item by value
- `.set(item[, ...])` - set array items to arguments

###String.protoype
- `.cut(match)` - basically replace(match, "")
- `.lower()` - alias toLowerCase()
- `.upper()` - alias toUpperCase()

###Element.prototype
- `.append(child[, ...])` - append variable children
- `.prepend(child[, ...])` - prepend variable children
- `.prependChild(child)` - prepend single child
- `.removeAll([start, end])` - remove all children or children within specified range
- `.set(attribute[, value])` - alias setAttribute(), value optional
- `.unset(attribute)` - alias removeAttribute()

###EventTarget.prototype
- `.on(type, listener[, useCapture])` - alias addEventListener()
- `.off(type, listener[, useCapture])` - alias removeEventListener()
- `.dispatch(event)` - alias dispatchEvent()

#localdata.js
Simple localStorage wrapper with three convenient methods for handling updates.

If you ever feel like dropping this script, don't worry about dependency. It's only a wrapper, and you can continue managing updates with the `v` property.

###Sample usage
```javascript
//default data
settings=localData({
	v: 1.0, //optional, default version if none exists
	mute: 0,
	skipscenes: 0,
	browsercheck: 0
	});

//load existing data
settings.load("game.settings");

//update potentially outdated data
settings.update(1.0, function(prev_version) {
	if(prev_version<0.5) {
		delete settings.test;
		}
	});

//save data
window.on("beforeunload", function(event) {
	settings.save("game.settings");
	});
```