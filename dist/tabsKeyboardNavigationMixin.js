
'use strict';

var KEYS = {
  enter: 13,
  left: 37,
  right: 39,
  space: 32,
  tab: 9,
  home: 36,
  end: 35
};

var KeyboardShortcutsMixin = {
  handleKeyPress: function handleKeyPress(event) {
    if (this.state.focused) {
      if (event.which === KEYS.space || event.which === KEYS.enter) {
        this.handleEnterPress();
      } else if (event.which === KEYS.right) {
        this.handleRightPress();
      } else if (event.which === KEYS.left) {
        this.handleLeftPress();
      } else if (event.which === KEYS.home) {
        this.handleHomePress();
      } else if (event.which === KEYS.end) {
        this.handleEndPress();
      }
    }
  },

  handleHomePress: function handleHomePress() {
    this.refs['tab-' + 0].focus();
  },

  handleEndPress: function handleEndPress() {
    this.refs['tab-' + (this.props.elements.length - 1)].focus();
  },

  handleEnterPress: function handleEnterPress() {
    this.props.handleTabChange(this.state.focusedItem);
  },

  handleRightPress: function handleRightPress() {
    if (this.state.focusedItem < this.props.elements.length - 1) {
      this.refs['tab-' + (this.state.focusedItem + 1)].focus();
    }
  },

  handleLeftPress: function handleLeftPress() {
    if (this.state.focusedItem > 0) {
      this.refs['tab-' + (this.state.focusedItem - 1)].focus();
    }
  },

  handleFocus: function handleFocus(i, event) {
    this.setState({
      focused: this.state.focused + 1,
      focusedItem: i
    });
  },

  handleBlur: function handleBlur(i, event) {
    this.setState({
      focused: this.state.focused - 1
    });
  },

  componentDidMount: function componentDidMount() {
    document.addEventListener('keyup', this.handleKeyPress);
  },

  componentWillUnmount: function componentWillUnmount() {
    document.removeEventListener('keyup', this.handleKeyPress);
  }
};

module.exports = KeyboardShortcutsMixin;