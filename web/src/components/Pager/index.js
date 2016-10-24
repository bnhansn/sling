import React, { Component } from 'react';
import PagerButton from '../PagerButton';

type Props = {
  onPagerClick: () => void,
  pagination: {
    total_pages: number,
    page_number: number,
  },
}

class Pager extends Component {
  props: Props

  handleClick = (direction) => this.props.onPagerClick(direction);

  render() {
    const { pagination: { total_pages, page_number } } = this.props;

    return (
      <nav>
        <div style={{ display: 'flex', marginBottom: '.5rem' }}>
          <PagerButton
            direction="prev"
            disabled={page_number === 1}
            onPagerClick={this.handleClick}
          />
          <PagerButton
            direction="next"
            disabled={page_number === total_pages}
            onPagerClick={this.handleClick}
          />
        </div>
        <div style={{ fontSize: '85%', textAlign: 'center' }}>
          Page {page_number} of {total_pages}
        </div>
      </nav>
    );
  }
}

export default Pager;
