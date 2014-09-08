#clean.js
---
Removes all whitespace `\s*` from DOM.

#useful.js
---
Various utility functions and pleasant aliases. Should work fine on all modern browsers.

###Object.prototype
- `.extend(object)`

###Array.prototype, NodeList.prototype
- `.lastIndex`
- `.contains(item)`
- `.each([this, ]callback)`
- `.fill(value)`
- `.random()`
- `.remove(item)`

###String.protoype
- `.lower()`
- `.upper()`

###Element.prototype
- `.append(child[, ...])`
- `.empty()`
- `.prepend(child[, ...])`
- `.set(attribute[, value])`
- `.unset(attribute)`

###EventTarget.prototype
- `.on(type, listener[, useCapture])`
- `.off(type, listener[, useCapture])`
- `.dispatch(event)`
