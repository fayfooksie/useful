#Table of Contents
- [clean.js](#clean.js) - removes whitespace
- [localdata.js](#localdatajs) - localStorage wrapper for versioning
- [request.js](#requestjs) - AJAX & SJAX
- [useful.js](#usefuljs) - common prototype extensions
- [useful-extended.js](#usefulextendedjs) - useful.js + request.js + DOM stuff

#clean.js
Removes all whitespace `\s*` from DOM.

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

#request.js
Public function for handling various kinds of (a)synchronous calls. If a callback is specified, it will be handled asynchronously; otherwise returns synchronous result.

###Usage
- `request(url)` - return synchronous result
- `request(url, callback)` - return request, callback(response)
- `request.run(url[, callback])` - return/callback parsed JavaScript
- `request.json(url[, callback])` - return/callback parsed JSON
- `request.buffer(url[, callback])` - return/callback parsed ArrayBuffer

#useful.js
Various utility functions and pleasant aliases. Should work fine on all modern browsers.

###Object
- `.inherit(target, parent)` - inherit prototype of parent

###Object.prototype
- `.extend(object)` - copy all property descriptors (get, set)
- `.extendFast(object)` - copy keys only

###Array.prototype, NodeList.prototype
- `.lastItem` - get/set last item
- `.contains(item)` - return boolean
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

#useful-extended.js
Combined utility functions of [useful.js](#usefuljs) and [request.js](#requestjs) with additional DOM-related functions.

###Features
- [useful.js](#usefuljs)
- [request.js](#requestjs)
- `document.text(text)` - creates a textNode
- `document.create(tag, attributes)` - see [document.create](#documentcreate)
- `document.idObject()` - return object of elements by id
- `Date.timeAgo(timestamp)` - return formatted string (en) of time between Date.now() and timestamp
- `<textarea>`
- - `grow` - auto-grow (textarea.on("keyup", grow);)
- - `replaceSelection(element, callback)` - replace selected text with callback(selection)

###document.create
Creates and returns an element `tag` with `attributes`. All attributes are set using `setAttribute` with the exception of `text` (used for textContent), `data` (used for dataset), and `events` (used for addEventListener).

The following, for example, creates `div#ego.warfare` which alerts "hello" on-click.
```javascript
document.create("div", {
	id: "ego",
	class: "warfare",
	text: "click me",
	data: {
		greet: "hello"
		},
	events: {
		click: function(event) {
			alert(this.dataset.greet);
			}
		}
	});
```