// __tests__/functions.js

var chai = require('chai')

var expect = chai.expect

describe('isFunction', function () {
  it('recives a function and returns true', function () {
    var isFunction = require('../functions').isFunction
    expect(isFunction(function () {})).to.equal(true)
  })

  it('recives a number and returns false', function () {
    var isFunction = require('../functions').isFunction
    expect(isFunction(234)).to.equal(false)
  })

  it('recives a string and returns false', function () {
    var isFunction = require('../functions').isFunction
    expect(isFunction('234')).to.equal(false)
  })

  it('recives a object and returns false', function () {
    var isFunction = require('../functions').isFunction
    expect(isFunction({})).to.equal(false)
  })

  it('recives a array and returns false', function () {
    var isFunction = require('../functions').isFunction
    expect(isFunction([])).to.equal(false)
  })
})
