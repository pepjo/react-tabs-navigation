
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _tabs = require('./tabs.jsx');

var _tabs2 = _interopRequireDefault(_tabs);

var _functions = require('./functions.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _react2.default.createClass({
  displayName: 'tabsNavigationMenu',
  propTypes: {
    banner: _react2.default.PropTypes.shape({ // Banner content (optional)
      children: _react2.default.PropTypes.oneOfType([// Tab initialy selected
      _react2.default.PropTypes.func, _react2.default.PropTypes.node])
    }),
    color: _react2.default.PropTypes.string,
    fixOffset: _react2.default.PropTypes.number,
    lineStyle: _react2.default.PropTypes.object,
    onTabChange: _react2.default.PropTypes.func,
    selected: _react2.default.PropTypes.oneOfType([// Tab initialy selected
    _react2.default.PropTypes.string, _react2.default.PropTypes.number]),
    selectedTabStyle: _react2.default.PropTypes.object,
    tabs: _react2.default.PropTypes.arrayOf(_react2.default.PropTypes.shape({
      children: _react2.default.PropTypes.oneOfType([// Tab initialy selected
      _react2.default.PropTypes.func, _react2.default.PropTypes.node]),
      displayName: _react2.default.PropTypes.string.isRequired
    })),
    tabsBarClassName: _react2.default.PropTypes.string,
    tabsBarStyle: _react2.default.PropTypes.object,
    tabsClassName: _react2.default.PropTypes.string,
    tabsStyle: _react2.default.PropTypes.object
  },
  getDefaultProps: function getDefaultProps() {
    return {
      fixOffset: 0,
      prev: 'Next',
      views: []
    };
  },
  getInitialState: function getInitialState() {
    return {
      selectedTab: this.props.selected || 0,
      width: 300
    };
  },
  componentDidMount: function componentDidMount() {
    window.addEventListener('resize', this.calculateWidth);
    this.calculateWidth();
  },
  componentWillUnmount: function componentWillUnmount() {
    window.removeEventListener('resize', this.calculateWidth);
  },
  calculateWidth: function calculateWidth() {
    this.setState({
      width: _reactDom2.default.findDOMNode(this.refs.tabsContainer).clientWidth
    });
  },
  handleTabChange: function handleTabChange(i) {
    this.setState({
      selectedTab: i
    });
    if (this.props.onTabChange) {
      this.props.onTabChange(i);
    }
  },
  render: function render() {
    return _react2.default.createElement(
      'div',
      null,
      _react2.default.createElement(
        'div',
        null,
        (0, _functions.renderFunction)(this.props.banner && this.props.banner.children)
      ),
      _react2.default.createElement(
        'div',
        {
          ref: 'tabsContainer' },
        _react2.default.createElement(_tabs2.default, {
          clic: this.handleTabChange,
          color: this.props.color,
          elements: this.props.tabs.map(function (item) {
            return item.displayName;
          }),
          fixOffset: this.props.fixOffset,
          lineStyle: this.state.lineStyle,
          selected: this.state.selectedTab,
          selectedTabStyle: this.props.selectedTabStyle,
          tabsBarClassName: this.props.tabsBarClassName,
          tabsBarStyle: this.props.tabsBarStyle,
          tabsClassName: this.props.tabsClassName,
          tabsStyle: this.props.tabsStyle,
          widthB: this.state.width
        })
      ),
      _react2.default.createElement(
        'div',
        null,
        (0, _functions.renderFunction)(this.props.tabs[this.state.selectedTab] && this.props.tabs[this.state.selectedTab].children)
      )
    );
  }
});