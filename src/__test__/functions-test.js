
'use strict'

var chai = require('chai')

var expect = chai.expect

describe('renderFunction', function () {
  it('recives a function and returns its execution', function () {
    var renderFunction = require('../functions').renderFunction
    expect(renderFunction(function () {
      return 'hey there'
    })).to.equal('hey there')
  })
  it('recives a number and returns it', function () {
    var renderFunction = require('../functions').renderFunction
    expect(renderFunction(10)).to.equal(10)
  })
  it('recives a string and returns it', function () {
    var renderFunction = require('../functions').renderFunction
    expect(renderFunction('hey there')).to.equal('hey there')
  })
})

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
