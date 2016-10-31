// @flow
import React, { Component } from 'react';
import { css, StyleSheet } from 'aphrodite';

const styles = StyleSheet.create({
  button: {
    padding: '0.5rem 1rem',
    fontWeight: 'normal',
    textAlign: 'center',
    whiteSpace: 'nowrap',
    verticalAlign: 'middle',
    cursor: 'pointer',
    userSelect: 'none',
    lineHeight: '1',
    fontSize: '1rem',
    color: 'rgb(136,153,166)',
    background: '#fff',
    border: '1px solid rgb(225,232,237)',
    ':hover': {
      backgroundColor: '#fff',
      borderColor: '#d6dee6',
    },
    ':focus': {
      outline: '5px auto -webkit-focus-ring-color',
      outlineOffset: '-2px',
    },
    ':disabled': {
      opacity: '.6',
      cursor: 'not-allowed',
    },
  },

  prev: {
    borderRight: '0',
    borderTopLeftRadius: '2px',
    borderBottomLeftRadius: '2px',
  },

  next: {
    borderTopRightRadius: '2px',
    borderBottomRightRadius: '2px',
  },

  icon: {
    lineHeigh: '1',
    fontSize: '20px',
  },
});

type Props = {
  direction: string,
  disabled: boolean,
  onPagerClick: (direction: string) => void,
}

class PagerButton extends Component {
  props: Props

  handleClick = () => this.props.onPagerClick(this.props.direction);

  render() {
    const { direction, disabled } = this.props;

    const buttonClass = css(
      styles.button,
      direction === 'prev' && styles.prev,
      direction === 'next' && styles.next,
    );

    return (
      <button onClick={this.handleClick} className={buttonClass} disabled={disabled}>
        {direction === 'prev' && <span className={css(styles.icon)}>&lt;</span>}
        {direction === 'next' && <span className={css(styles.icon)}>&gt;</span>}
      </button>
    );
  }
}

export default PagerButton;
