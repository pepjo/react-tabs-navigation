
'use strict'

var Color = require('color')
var Radium = require('radium')
var React = require('react')
var ReactDom = require('react-dom')

var tabKeyMixin = require('./tabsKeyboardNavigationMixin.js')

const defaultColor = 'rgb(11, 104, 159)'
const defaultStyles = {
  color: defaultColor,
  lineStyle: {
    backgroundColor: defaultColor,
    height: 3,
    display: 'block',
    transition: 'margin-left 0.25s cubic-bezier(0.15, 0.48, 0.42, 1.13)'
  },
  selectedTabStyle: {
    backgroundColor: Color(defaultColor).lighten(0.4).whiten(3.5).alpha(0.1).rgbaString(),
    outline: 'none'
  },
  tabsBarStyle: {
    height: 55,
    backgroundColor: 'rgba(255, 255, 255, 0.96)',
    fontSize: 18
  },
  tabsStyle: {
    height: 40,
    paddingTop: 15,
    marginTop: 0,
    display: 'block',
    float: 'left',
    textAlign: 'center',
    cursor: 'pointer',
    WebkitUserSelect: 'none',
    MozUserSelect: 'none',
    msUserSelect: 'none',
    userSelect: 'none',
    ':focus': {
      boxShadow: 'inset 0 0 8px rgba(11, 104, 159, 0.3)'
    }
  }
}

module.exports = Radium(React.createClass({
  displayName: 'tabsNavigationMenu__tabs',
  propTypes: {
    clic: React.PropTypes.func,
    color: React.PropTypes.string,
    elements: React.PropTypes.arrayOf(React.PropTypes.string),
    fixOffset: React.PropTypes.number,
    lineStyle: React.PropTypes.object,
    selected: React.PropTypes.number,
    selectedTabStyle: React.PropTypes.object,
    tabsBarClassName: React.PropTypes.string,
    tabsBarStyle: React.PropTypes.object,
    tabsClassName: React.PropTypes.string,
    tabsStyle: React.PropTypes.object,
    widthB: React.PropTypes.number
  },
  mixins: [tabKeyMixin],
  getDefaultProps: function () {
    return {
      clic: null,
      elements: ['tab1', 'tab2'],
      selected: 0,
      widthB: 300,
      tabsBarClassName: '',
      tabsClassName: ''
    }
  },
  getInitialState: function () {
    return {
      menuFixed: false,
      focused: 0,
      focusedItem: this.props.selected
    }
  },
  componentDidMount: function () {
    window.addEventListener('scroll', this.handleElementScroll)
  },
  componentWillUnmount: function () {
    window.removeEventListener('scroll', this.handleElementScroll)
  },

  // We should handle scroll events in order to detect when the bar should be
  // fixed
  handleElementScroll: function () {
    let top = ReactDom.findDOMNode(this.refs.bar).offsetTop - this.props.fixOffset
    if (window.scrollY > top) {
      this.setState({
        menuFixed: true
      })
    } else if (window.scrollY <= top) {
      this.setState({
        menuFixed: false
      })
    }
  },

  // This modifies the styles defined by the user if a color is defined
  // But no color is defined inside the props styles
  // or if no height and paddingTop are defined
  styles: function () {
    let styles = {
      lineStyle: this.props.lineStyle || {},
      selectedTabStyle: this.props.selectedTabStyle || defaultStyles.selectedTabStyle,
      tabsStyle: this.props.tabsStyle || {},
      tabsBarStyle: this.props.tabsBarStyle || {}
    }
    if (this.props.color) {
      if (!styles.lineStyle.color) {
        styles.lineStyle.color = this.props.color
      }
    }

    if (!styles.tabsStyle[':hover']) {
      styles.tabsStyle[':hover'] = styles.selectedTabStyle
    }

    if (!styles.tabsStyle[':focus']) {
      styles.tabsStyle[':focus'] = styles.selectedTabStyle
    }

    if (!styles.selectedTabStyle.backgroundColor) {
      styles.selectedTabStyle.backgroundColor = defaultStyles.selectedTabStyle.backgroundColor
    }

    return styles
  },

  // We handle the click event on our tab and send it to the parent
  handeClick: function (i) {
    if (this.props.clic) {
      this.props.clic(i)
    }
  },

  render: function () {
    const styles = this.styles() // Gets the user styles for this element
    let filler = this.state.menuFixed
    ? <div
      style={{
        height: styles.tabsStyle.height + styles.tabsStyle.paddingTop + styles.tabsStyle.marginTop
      }}
    />
    : null

    let elementWidth = 1 / this.props.elements.length * 100 // in percentage

    let bar = {
      marginLeft: (elementWidth * this.props.selected) + '%',
      width: elementWidth + '%'
    }

    let styleMenu = {
      top: this.state.menuFixed ? this.props.fixOffset : null,
      width: this.state.menuFixed ? this.props.widthB : null,
      position: this.state.menuFixed ? 'fixed' : null,
      zIndex: this.props.tabsBarStyle ? this.props.tabsBarStyle.zIndex : null
    }

    // The different tabs
    let elements = this.props.elements.map((element, i) => {
      let style = {
        width: elementWidth + '%'
      }

      let tabStyles = [defaultStyles.tabsStyle, styles.tabsStyle]

      let cssClass = this.props.tabsClassName
      if (this.props.selected === i) {
        cssClass += ' is-selected'
        tabStyles.push(defaultStyles.selectedTabStyle)
        tabStyles.push(styles.selectedTabStyle)
      }

      tabStyles.push(style)

      return (
        <span
          aria-expanded={this.state.focusedItem === i}
          aria-selected={this.state.focused > 0 ? this.props.selected === i : false}
          className={cssClass}
          key={i}
          onBlur={this.handleBlur.bind(this, i)}
          onClick={this.handeClick.bind(this, i)}
          onFocus={this.handleFocus.bind(this, i)}
          ref={'tab-' + i}
          role="tab"
          style={tabStyles}
          tabIndex={this.props.selected === i ? 0 : -1}>
          {element}
        </span>
      )
    })

    return (
      <div ref="bar">
        <div>
          {filler}
        </div>
        <div style={styleMenu}>
          <nav
            className={this.props.tabsBarClassName}
            multiselectable="false"
            role="tablist"
            style={[defaultStyles.tabsBarStyle, styles.tabsBarStyle]}>
            {elements}
          </nav>
          <span style={[defaultStyles.lineStyle, styles.lineStyle, bar]}/>
        </div>
      </div>
    )
  }
}))
