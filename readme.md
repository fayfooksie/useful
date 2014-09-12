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
- `.lastItem` - get last item
- `.contains(item)` - returns boolean
- `.each([this, ]callback)` - alternative forEach()
- `.fill(value)` - set all items to value
- `.random()` - return random item
- `.remove(item)` - remove item by value

###String.protoype
- `.lower()` - alias toLowerCase()
- `.upper()` - alias toUpperCase()

###Element.prototype
- `.empty()` - remove all children
- `.append(child[, ...])` - append variable children
- `.prepend(child[, ...])` - prepend variable children
- `.set(attribute[, value])` - alias setAttribute(), value optional
- `.unset(attribute)` - alias removeAttribute()

###EventTarget.prototype
- `.on(type, listener[, useCapture])` - alias addEventListener()
- `.off(type, listener[, useCapture])` - alias removeEventListener()
- `.dispatch(event)` - alias dispatchEvent()
