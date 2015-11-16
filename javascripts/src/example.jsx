
'use strict'

var React = require('react')
var ReactDOM = require('react-dom')
var Tabs = require('react-tabs-navigation')

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
            <h2>Documentation and examples</h2>
            <p>See github:
              <a href="https://github.com/pepjo/react-tabs-navigation">
                {'https://github.com/pepjo/react-tabs-navigation'}
              </a>
            </p>
          </div>
        ),
        displayName: 'Docs'
      },
      {
        // Second tab
        children: () => (
          <div>
            <h2>
              <a
                aria-hidden="true"
                className="anchor"
                href="#mit-license"
                id="mit-license">
                <span className="octicon octicon-link"></span>
              </a>
              MIT License
            </h2>
            <p>{'Copyright (c) 2015, Pep Rodeja'}</p>

            <p>{'Permission is hereby granted, free of charge, to any person obtaining a copy ' +
            'of this software and associated documentation files (the "Software"), to deal ' +
            'in the Software without restriction, including without limitation the rights ' +
            'to use, copy, modify, merge, publish, distribute, sublicense, and/or sell ' +
            'copies of the Software, and to permit persons to whom the Software is ' +
            'furnished to do so, subject to the following conditions:'}</p>

          <p>{'The above copyright notice and this permission notice shall be included in ' +
            'all copies or substantial portions of the Software.'}</p>

          <p>{'THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR ' +
            'IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, ' +
            'FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.  IN NO EVENT SHALL THE ' +
            'AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER ' +
            'LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, ' +
            'OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN ' +
            'THE SOFTWARE.'}</p>
          </div>
        ),
        displayName: 'License'
      },
      {
        // Third tab
        children: () => (
          <ul>
            <li>This</li>
            <li>is</li>
            <li>super</li>
            <li>large</li>
            <li>so</li>
            <li>you</li>
            <li>can</li>
            <li>scroll</li>
            <li>down</li>
            <li>.</li>
            <li>This</li>
            <li>is</li>
            <li>super</li>
            <li>large</li>
            <li>so</li>
            <li>you</li>
            <li>can</li>
            <li>scroll</li>
            <li>down</li>
            <li>.</li>
            <li>This</li>
            <li>is</li>
            <li>super</li>
            <li>large</li>
            <li>so</li>
            <li>you</li>
            <li>can</li>
            <li>scroll</li>
            <li>down</li>
            <li>.</li>
            <li>This</li>
            <li>is</li>
            <li>super</li>
            <li>large</li>
            <li>so</li>
            <li>you</li>
            <li>can</li>
            <li>scroll</li>
            <li>down</li>
            <li>.</li>
            <li>This</li>
            <li>is</li>
            <li>super</li>
            <li>large</li>
            <li>so</li>
            <li>you</li>
            <li>can</li>
            <li>scroll</li>
            <li>down</li>
            <li>.</li>
            <li>This</li>
            <li>is</li>
            <li>super</li>
            <li>large</li>
            <li>so</li>
            <li>you</li>
            <li>can</li>
            <li>scroll</li>
            <li>down</li>
            <li>.</li>
          </ul>
        ),
        displayName: 'Scroll'
      }
    ]}
    tabsBarStyle={{backgroundColor: 'rgba(242, 250, 255, 0.95)'}}
  />
)

let mountNode = document.getElementById('react-container')

ReactDOM.render(component, mountNode)
