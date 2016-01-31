react-tabs-navigation
=====================
[![Build Status](https://travis-ci.org/pepjo/react-tabs-navigation.svg)](https://travis-ci.org/pepjo/react-tabs-navigation) [![Code Climate](https://codeclimate.com/github/pepjo/react-tabs-navigation/badges/gpa.svg)](https://codeclimate.com/github/pepjo/react-tabs-navigation) [![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com/)

[![js-standard-style](https://cdn.rawgit.com/feross/standard/master/badge.svg)](https://github.com/feross/standard)

This react component enables navigating through tabs in your web app.
It is composed of three different parts:

1. Banner

   This content does not change with tabs and sits on top of the tabs bar. When the user scrolls past the banner the tabs bar stick on top of the page

2. Tabs

   The tabs of the element. They are horizontal. You can define their styles, hover styles and selected styles.

   The selected tab in underlined, this animates to the newly selected tab when a new tab is selected.

3. Content

   The content that changes when the user changes the tab.

Installing
----------

```bash
$ npm install react-tabs-navigation
```

Live demo
---------

Here: http://pepjo.github.io/react-tabs-navigation/

Props
-----

This component accept the following props:

* banner [object]

  content over the tab bar

  * children [func|node]

    a node or a function that returns a node (recommended)

* color [string]

  main color (can be overridden on lineStyles and tabStyles)

* fixOffset [number]

  The tabs bar fixes on the sreen when you scroll pass to it.
  If you want it to fix below the upper limit of the document set here the offset
  If you want it to not fix set the offset to at least -(the height of the bar)

* lineStyle [object]

  Styles of the underline.
  Use `backgroundColor` to change the color and height to change the `width` (default 3px) of the line.
  (Accepts Radium properties like `:hover`)

* onTabChange [func]

  Function that gets executed when a tab changes, first argument is the index of the tab.
  If you return `false` the tab will not change. Of course, you will still be
  able to change it changing the selectedTab prop.

* selected [string|number]

  The index or the `keyName` of the tab selected initially

* selectedTabStyle [object]

  The style of the tab when it is selected.
  (Accepts Radium properties like `:hover`)

* **tabs** [array] -required-

  An array of objects, one for each tab

  * children [func|node]

    a node or a function that returns a node (recommended)

  * displayName [string]

    the name displayed on the tab

* tabsBarClassName [string]

  className of the tabs bar element

* tabsBarStyle [object]

  The style of the tabs bar

* tabsClassName [string]

  className of each tab. When they are selected they also have the class `is-selected`

* tabsStyle [object]

  The style of the tab.
  (Accepts Radium properties like `:hover`)

Public Methods
--------------

* `changeSelectedTab(indexTab)` to change the selected tab

Simple example
--------------

One of the simplest examples one could use

````javascript
import Tabs from 'react-tabs-navigation'

<Tabs
  banner={{
    children: 'Content over the tabs!'
  }}
  tabs={[
    {
      children: () => (
        <div>
          This is the first tab content
        </div>
      ),
      displayName: 'Tab 1'
    },
    {
      children: () => (
        <div>
          This is the second tab content
        </div>
      ),
      displayName: 'Tab 2'
    }
  ]}
/>
````

Full example
------------

A more complete example using more functionalities

````javascript
import Tabs from 'react-tabs-navigation'

<Tabs
  banner={{
    children: 'Content over the tabs!'
  }}
  tabs={[
    {
      children: () => (
        <div>
          This is the first tab content
        </div>
      ),
      displayName: 'Tab 1'
    },
    {
      children: () => (
        <div>
          This is the second tab content
        </div>
      ),
      displayName: 'Tab 2'
    }
  ]}
/>
````

To do list
----------

- [x] Use travis
- [x] Write some tests
- [ ] Optional animation when changing between tabs
- [x] Keyboard navigation
- [ ] Optional scroll behavior (see: [this issue] (https://github.com/pepjo/react-tabs-navigation/issues/2#issuecomment-167140069))

Contribute
------------

### Getting Started

* Submit a ticket for your issue on GitHub in [Repository issues](https://github.com/pepjo/react-tabs-navigation/issues)

### Making Changes
We are following [Gitflow](http://nvie.com/posts/a-successful-git-branching-model/) workflow.

* Create feature branch from `master` branch called `feature/{ISSUE}` where `{ISSUE}` is GitHub issue identifier e.g. `feature/123`
* Make commits of logical units
* Don't forget about tests! :)
* Stick to code standards
* Don't forget to build `$ npm run build` !!

#### Improving the example

In order to build the example source code you can use `gulp example-watchify` or `gulp example-browserify` depending on the desired behaviour.

### Submiting Changes

1. Push your branch to base repository
2. Submit a pull request to `master` branch
3. Wait for someone to review your changes and merge it
4. If your pull request is tagged as `To correct` you should fix your code as soon as possible and go back to point 3.

MIT License
------------

Copyright (c) 2015, Pep Rodeja

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.  IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
