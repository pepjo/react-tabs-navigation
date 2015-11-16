
'use strict';

// Check if this is a function

function isFunction(functionToCheck) {
  var getType = {};
  return functionToCheck && getType.toString.call(functionToCheck) === '[object Function]';
}

// Checks if the element is a funciton or a renderable element and render both
function renderFunction(node) {
  if (node) {
    if (isFunction(node)) {
      return node();
    } else {
      return node;
    }
  }
}

module.exports = {
  isFunction: isFunction,
  renderFunction: renderFunction
};