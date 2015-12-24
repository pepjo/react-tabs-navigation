
'use strict'

/* Global variables for RADIUM */
global.navigator = {}
global.navigator.userAgent = 'Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/41.0.2228.0 Safari/537.36'

var chai = require('chai')
var sd = require('skin-deep')

var expect = chai.expect

var React = require('react')
var Tabs = require('../tabs')

describe('Function: Highlight the selected tab', function () {
  context('Scenario: success', function () {
    describe('When the first tab is selected', function () {
      let tabs

      beforeEach(function () {
        tabs = sd.shallowRender(
          <Tabs
            elements={['tab1', 'tab2']}
            selected={0}
          />
        )
      })

      it('the first tab should be highlighten', function () {
        const component = tabs.getRenderOutput()
        expect(component.props.children[1].props.children[1].props.style.marginLeft).to.equal('0%')
      })
    })

    describe('When the second tab is selected', function () {
      let tabs

      beforeEach(function () {
        tabs = sd.shallowRender(
          <Tabs
            elements={['tab1', 'tab2']}
            selected={1}
          />
        )
      })

      it('the second tab should be highlighten', function () {
        const component = tabs.getRenderOutput()
        expect(component.props.children[1].props.children[1].props.style.marginLeft).to.equal('50%')
      })
    })
  })

  after(function () {
    delete global.navigator
  })
})
