
'use strict'

var chai = require('chai')

var sd = require('skin-deep')

var expect = chai.expect

var React = require('react')
var Tabs = require('../index')

describe('Function: display content tab when rendered for the first time', function () {
  context('Scenario: success', function () {
    describe('When we select the first tab on props', function () {
      let tabs

      beforeEach(function () {
        tabs = sd.shallowRender(
          <Tabs
            tabs={[
              {
                children: 'Hello',
                displayName: 'Tab1'
              }
            ]}
          />
        )
      })

      it('Should display the first tab content', function () {
        const component = tabs.getRenderOutput()
        expect(component.props.children[2].props.children).to.equal('Hello')
      })
    })

    describe('When we select the second tab on props', function () {
      let tabs

      beforeEach(function () {
        tabs = sd.shallowRender(
          <Tabs
            selected={1}
            tabs={[
              {
                children: 'content1',
                displayName: 'Tab1'
              },
              {
                children: 'content2',
                displayName: 'Tab2'
              }
            ]}
          />
        )
      })

      it('Should display the second tab content', function () {
        let component = tabs.getRenderOutput()
        expect(component.props.children[2].props.children).to.equal('content2')
      })
    })
  })
})

describe('Function: change active tab when tab clicked', function () {
  context('Scenario: we are on the first tab', function () {
    describe('When the user clicks the second tab', function () {
      let tabs, component

      before(function () {
        tabs = sd.shallowRender(
          <Tabs
            selected={1}
            tabs={[
              {
                children: 'content1',
                displayName: 'Tab1'
              },
              {
                children: 'content2',
                displayName: 'Tab2'
              }
            ]}
          />
        )
        component = tabs.getRenderOutput()
        component.props.children[1].props.children.props.clic(1)
      })

      it('The content will be the seconds tabs content', function () {
        expect(component.props.children[2].props.children).to.equal('content2')
      })

      it('The highlighted tab should be the second one', function () {
        expect(component.props.children[1].props.children.props.selected).to.equal(1)
      })
    })
  })
})
