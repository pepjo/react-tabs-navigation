// Via http://www.asbjornenge.com/wwc/testing_react_components.html
module.exports = function (markup) {
  if (typeof document !== 'undefined') return
  var jsdom = require('jsdom').jsdom
  global.document = jsdom(markup || '')
  global.window = document.defaultView
  global.navigator = {}
  global.navigator.userAgent = 'Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/41.0.2228.0 Safari/537.36'
  // ... add whatever browser globals your tests might need ...
}
