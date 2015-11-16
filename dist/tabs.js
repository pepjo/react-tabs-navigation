
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _color = require('color');

var _color2 = _interopRequireDefault(_color);

var _radium = require('radium');

var _radium2 = _interopRequireDefault(_radium);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

window.Color = _color2.default;

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
    backgroundColor: (0, _color2.default)(defaultColor).lighten(0.4).whiten(3.5).alpha(0.1).rgbaString()
  },
  tabsBarStyle: {
    height: '55px',
    backgroundColor: 'rgba(255, 255, 255, 0.96)',
    fontSize: '18px'
  },
  tabsStyle: {
    height: 40,
    paddingTop: 15,
    marginTop: 0,
    backgroundColor: 'rgb(255, 255, 255)',
    ':hover': {
      backgroundColor: (0, _color2.default)(defaultColor).lighten(0.4).whiten(3.5).alpha(0.1).rgbaString()
    }
  }
};

exports.default = (0, _radium2.default)(_react2.default.createClass({
  displayName: 'tabsNavigationMenu__tabs',
  propTypes: {
    clic: _react2.default.PropTypes.func,
    color: _react2.default.PropTypes.string,
    elements: _react2.default.PropTypes.arrayOf(_react2.default.PropTypes.string),
    fixOffset: _react2.default.PropTypes.number,
    lineStyle: _react2.default.PropTypes.object,
    selected: _react2.default.PropTypes.number,
    selectedTabStyle: _react2.default.PropTypes.object,
    tabsBarClassName: _react2.default.PropTypes.string,
    tabsBarStyle: _react2.default.PropTypes.object,
    tabsClassName: _react2.default.PropTypes.string,
    tabsStyle: _react2.default.PropTypes.object,
    widthB: _react2.default.PropTypes.number
  },
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
      menuFixed: false
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
    var top = _reactDom2.default.findDOMNode(this.refs.bar).offsetTop - this.props.fixOffset;
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
      selectedTabStyle: this.props.selectedTabStyle || {},
      tabsStyle: this.props.tabsStyle || {},
      tabsBarStyle: this.props.tabsBarStyle || {}
    };
    if (this.props.color) {
      if (!styles.lineStyle.color) {
        styles.lineStyle.color = this.props.color;
      }

      if (!styles.selectedTabStyle.backgroundColor) {
        styles.selectedTabStyle.backgroundColor = (0, _color2.default)(this.props.color).lighten(0.4).whiten(3.5).alpha(0.1).rgbaString();
      }

      if (!styles.tabsStyle[':hover']) {
        styles.tabsStyle[':hover'] = styles.selectedTabStyle[':hover'];
      }
    }

    if (!styles.tabsStyle.height) {
      styles.tabsStyle.height = defaultStyles.tabsStyle.height;
    }

    if (!styles.tabsStyle.paddingTop) {
      styles.tabsStyle.paddingTop = defaultStyles.tabsStyle.paddingTop;
    }

    if (!styles.tabsStyle.marginTop) {
      styles.tabsStyle.marginTop = defaultStyles.tabsStyle.marginTop;
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
    var filler = this.state.menuFixed ? _react2.default.createElement('div', {
      style: {
        height: styles.tabsStyle.height + styles.tabsStyle.paddingTop + styles.tabsStyle.marginTop
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
      position: this.state.menuFixed ? 'fixed' : null
    };

    // The different tabs
    var elements = this.props.elements.map(function (element, i) {
      var cssClass = _this.props.tabsClassName;
      if (_this.props.selected === i) {
        cssClass += ' is-selected';
      }

      var style = {
        width: elementWidth + '%'
      };

      return _react2.default.createElement(
        'span',
        {
          className: cssClass,
          key: i,
          onClick: _this.handeClick.bind(_this, i),
          style: [defaultStyles.tabsStyle, styles.tabsStyle, style] },
        element
      );
    });

    return _react2.default.createElement(
      'div',
      { ref: 'bar' },
      _react2.default.createElement(
        'div',
        null,
        filler
      ),
      _react2.default.createElement(
        'div',
        { style: styleMenu },
        _react2.default.createElement(
          'nav',
          { className: this.props.tabsBarClassName, style: [defaultStyles.tabsBarStyle, styles.tabsBarStyle] },
          elements
        ),
        _react2.default.createElement('span', { style: [defaultStyles.lineStyle, styles.lineStyle, bar] })
      )
    );
  }
}));