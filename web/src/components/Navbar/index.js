// @flow
import React from 'react';
import { Link } from 'react-router';
import { css, StyleSheet } from 'aphrodite';

const styles = StyleSheet.create({
  navbar: {
    display: 'flex',
    alignItems: 'center',
    padding: '0 1rem',
    height: '70px',
    background: '#fff',
    boxShadow: '0 1px 1px rgba(0,0,0,.1)',
  },

  link: {
    color: '#555459',
    fontSize: '22px',
    fontWeight: 'bold',
    ':hover': {
      textDecoration: 'none',
    },
    ':focus': {
      textDecoration: 'none',
    },
  },
});

const Navbar = () =>
  <nav className={css(styles.navbar)}>
    <Link to="/" className={css(styles.link)}>Sling</Link>
  </nav>;

export default Navbar;
