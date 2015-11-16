
'use strict'

import React from 'react'
import ReactDOM from 'react-dom'
import Tabs from 'react-tabs-navigation'

let component = (
  <Tabs
    banner={{
      children: 'Content over the tabs!'
    }}
    tabs={[
      {
        // Fist tab
        children: () => (
          <div>
            This is the first tab content
          </div>
        ),
        displayName: 'Tab 1'
      },
      {
        // Second tab
        children: () => (
          <div>
            This is the second tab content
          </div>
        ),
        displayName: 'Tab 2'
      },
      {
        // Third tab
        children: () => (
          <div>
            This is the third tab content
          </div>
        ),
        displayName: 'Tab 3'
      }
    ]}
  />
)

let mountNode = document.getElementById('react-container')

ReactDOM.render(component, mountNode)
