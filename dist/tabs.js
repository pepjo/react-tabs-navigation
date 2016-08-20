
'use strict';

var Color = require('color');
var Radium = require('radium');
var React = require('react');
var ReactDom = require('react-dom');

var tabKeyMixin = require('./tabsKeyboardNavigationMixin.js');

var defaultColor = 'rgb(11, 104, 159)';
var defaultStyles = {
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
    height: '100%',
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
    boxSizing: 'border-box',
    ':focus': {
      boxShadow: 'inset 0 0 8px rgba(11, 104, 159, 0.3)'
    }
  }
};

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
    tabsContainer: React.PropTypes.any,
    tabsStyle: React.PropTypes.object,
    widthB: React.PropTypes.number
  },
  mixins: [tabKeyMixin],
  getDefaultProps: function getDefaultProps() {
    return {
      clic: null,
      elements: ['tab1', 'tab2'],
      selected: 0,
      widthB: 300,
      tabsBarClassName: '',
      tabsClassName: ''
    };
  },
  getInitialState: function getInitialState() {
    return {
      menuFixed: false,
      focused: 0,
      focusedItem: this.props.selected
    };
  },
  componentDidMount: function componentDidMount() {
    window.addEventListener('scroll', this.handleElementScroll);
  },
  componentWillUnmount: function componentWillUnmount() {
    window.removeEventListener('scroll', this.handleElementScroll);
  },

  // We should handle scroll events in order to detect when the bar should be
  // fixed
  handleElementScroll: function handleElementScroll() {
    var top = ReactDom.findDOMNode(this.props.tabsContainer).offsetTop - this.props.fixOffset;
    if (window.scrollY > top) {
      this.setState({
        menuFixed: true
      });
    } else if (window.scrollY <= top) {
      this.setState({
        menuFixed: false
      });
    }
  },

  // This modifies the styles defined by the user if a color is defined
  // But no color is defined inside the props styles
  // or if no height and paddingTop are defined
  styles: function styles() {
    var styles = {
      lineStyle: this.props.lineStyle || {},
      selectedTabStyle: this.props.selectedTabStyle || defaultStyles.selectedTabStyle,
      tabsStyle: this.props.tabsStyle || {},
      tabsBarStyle: this.props.tabsBarStyle || {}
    };
    if (this.props.color) {
      if (!styles.lineStyle.color) {
        styles.lineStyle.color = this.props.color;
      }
    }

    if (!styles.tabsStyle[':hover']) {
      styles.tabsStyle[':hover'] = styles.selectedTabStyle;
    }

    if (!styles.tabsStyle[':focus']) {
      styles.tabsStyle[':focus'] = styles.selectedTabStyle;
    }

    if (!styles.selectedTabStyle.backgroundColor) {
      styles.selectedTabStyle.backgroundColor = defaultStyles.selectedTabStyle.backgroundColor;
    }

    return styles;
  },

  // We handle the click event on our tab and send it to the parent
  handeClick: function handeClick(i) {
    if (this.props.clic) {
      this.props.clic(i);
    }
  },

  render: function render() {
    var _this = this;

    var styles = this.styles(); // Gets the user styles for this element
    var filler = this.state.menuFixed ? React.createElement('div', {
      style: {
        height: (styles.tabsBarStyle.height || defaultStyles.tabsBarStyle.height || 0) + (styles.tabsBarStyle.paddingTop || defaultStyles.tabsBarStyle.paddingTop || 0) + (styles.tabsBarStyle.marginTop || defaultStyles.tabsBarStyle.marginTop || 0)
      }
    }) : null;

    var elementWidth = 1 / this.props.elements.length * 100; // in percentage

    var bar = {
      marginLeft: elementWidth * this.props.selected + '%',
      width: elementWidth + '%'
    };

    var styleMenu = {
      top: this.state.menuFixed ? this.props.fixOffset : null,
      width: this.state.menuFixed ? this.props.widthB : null,
      position: this.state.menuFixed ? 'fixed' : null,
      zIndex: this.props.tabsBarStyle ? this.props.tabsBarStyle.zIndex : null
    };

    // The different tabs
    var elements = this.props.elements.map(function (element, i) {
      var style = {
        width: elementWidth + '%'
      };

      var tabStyles = [defaultStyles.tabsStyle, styles.tabsStyle];

      var cssClass = _this.props.tabsClassName;
      if (_this.props.selected === i) {
        cssClass += ' is-selected';
        tabStyles.push(defaultStyles.selectedTabStyle);
        tabStyles.push(styles.selectedTabStyle);
      }

      tabStyles.push(style);

      return React.createElement(
        'span',
        {
          'aria-expanded': _this.state.focusedItem === i,
          'aria-selected': _this.state.focused > 0 ? _this.props.selected === i : false,
          className: cssClass,
          key: i,
          onBlur: _this.handleBlur.bind(_this, i),
          onClick: _this.handeClick.bind(_this, i),
          onFocus: _this.handleFocus.bind(_this, i),
          ref: 'tab-' + i,
          role: 'tab',
          style: tabStyles,
          tabIndex: _this.props.selected === i ? 0 : -1 },
        element
      );
    });

    return React.createElement(
      'div',
      { ref: 'bar' },
      React.createElement(
        'div',
        null,
        filler
      ),
      React.createElement(
        'div',
        { style: styleMenu },
        React.createElement(
          'nav',
          {
            className: this.props.tabsBarClassName,
            'aria-multiselectable': 'false',
            role: 'tablist',
            style: [defaultStyles.tabsBarStyle, styles.tabsBarStyle] },
          elements
        ),
        React.createElement('span', { style: [defaultStyles.lineStyle, styles.lineStyle, bar] })
      )
    );
  }
}));