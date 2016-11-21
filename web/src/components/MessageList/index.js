// @flow
import React, { Component } from 'react';
import moment from 'moment';
import groupBy from 'lodash/groupBy';
import mapKeys from 'lodash/mapKeys';
import includes from 'lodash/includes';
import { css, StyleSheet } from 'aphrodite';
import debounce from 'lodash/debounce';
import Message from '../Message';
import { Message as MessageType } from '../../types';

const styles = StyleSheet.create({
  container: {
    flex: '1',
    padding: '10px 10px 0 10px',
    background: '#fff',
    overflowY: 'auto',
  },

  dayDivider: {
    position: 'relative',
    margin: '1rem 0',
    textAlign: 'center',
    '::after': {
      position: 'absolute',
      top: '50%',
      right: '0',
      left: '0',
      height: '1px',
      background: 'rgb(240,240,240)',
      content: '""',
    },
  },

  dayText: {
    zIndex: '1',
    position: 'relative',
    background: '#fff',
    padding: '0 12px',
  },
});

type Props = {
  messages: Array<MessageType>,
  onLoadMore: () => void,
  loadingOlderMessages: boolean,
  moreMessages: boolean,
}

class MessageList extends Component {
  constructor(props: Props) {
    super(props);
    this.handleScroll = debounce(this.handleScroll, 200);
  }

  componentDidMount() {
    this.container.addEventListener('scroll', this.handleScroll);
  }

  componentWillReceiveProps(nextProps: Props) {
    if (nextProps.messages.length !== this.props.messages.length) {
      this.maybeScrollToBottom();
    }
  }

  componentWillUnmount() {
    this.container.removeEventListener('scroll', this.handleScroll);
  }

  props: Props
  container: () => void

  maybeScrollToBottom = () => {
    if (this.container.scrollHeight - this.container.scrollTop <
        this.container.clientHeight + 50) {
      this.scrollToBottom();
    }
  }

  scrollToBottom = () => {
    setTimeout(() => { this.container.scrollTop = this.container.scrollHeight; });
  }

  handleScroll = () => {
    if (this.props.moreMessages && this.container.scrollTop < 20) {
      this.props.onLoadMore();
    }
  }

  renderMessages = (messages: Array<MessageType>) =>
    messages.map((message) => <Message key={message.id} message={message} />);

  renderDays() {
    const messageList = [];
    this.props.messages.map((message) => {
      const messageData: MessageType = message;
      messageData.day = moment(message.inserted_at).format('MMMM Do');
      messageList.push(messageData);
      return false;
    });
    const dayGroups = groupBy(messageList, 'day');
    const days = [];
    mapKeys(dayGroups, (value, key) => {
      days.push({ date: key, messages: value });
    });
    const today = moment().format('MMMM Do');
    const yesterday = moment().subtract(1, 'days').format('MMMM Do');
    return days.map((day) =>
      <div key={day.date}>
        <div className={css(styles.dayDivider)}>
          <span className={css(styles.dayText)}>
            {day.date === today && 'Today'}
            {day.date === yesterday && 'Yesterday'}
            {!includes([today, yesterday], day.date) && day.date}
          </span>
        </div>
        {this.renderMessages(day.messages)}
      </div>
    );
  }

  render() {
    return (
      <div className={css(styles.container)} ref={(c) => { this.container = c; }}>
        {this.props.moreMessages &&
          <div style={{ textAlign: 'center' }}>
            <button
              className="btn btn-link btn-sm"
              onClick={this.props.onLoadMore}
              disabled={this.props.loadingOlderMessages}
            >
              {this.props.loadingOlderMessages ? 'Loading' : 'Load more'}
            </button>
          </div>
        }
        {this.renderDays()}
      </div>
    );
  }
}

export default MessageList;
