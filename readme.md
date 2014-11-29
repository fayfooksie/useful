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
