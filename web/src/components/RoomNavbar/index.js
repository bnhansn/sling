// @flow
import React, { Component } from 'react';
import { css, StyleSheet } from 'aphrodite';
import TopicForm from '../TopicForm';
import { Room } from '../../types';

const styles = StyleSheet.create({
  navbar: {
    padding: '15px',
    background: '#fff',
    borderBottom: '1px solid rgb(240,240,240)',
  },

  roomMeta: {
    display: 'flex',
    alignItems: 'center',
    fontSize: '12px',
    height: '24px',
  },

  topicButton: {
    padding: '2px 4px',
    color: 'rgb(120,120,120)',
    background: 'transparent',
    border: '0',
    borderRadius: '4px',
    cursor: 'pointer',
    ':hover': {
      boxShadow: '0 0 2px rgba(0,0,0,.25)',
    },
  },
});

type State = {
  editingTopic: boolean,
}

type Props = {
  room: Room,
  onTopicUpdate: () => void,
}

class RoomNavbar extends Component {
  constructor(props: Props) {
    super(props);
    this.state = {
      editingTopic: false,
    };
  }

  state: State

  componentWillReceiveProps(nextProps: Props) {
    if (nextProps.room.id !== this.props.room.id ||
        nextProps.room.topic !== this.props.room.topic) {
      this.setState({ editingTopic: false });
    }
  }

  props: Props

  handleTopicUpdate = (data: { topic: string }) => this.props.onTopicUpdate(data);

  render() {
    const { room } = this.props;
    const { editingTopic } = this.state;

    return (
      <nav className={css(styles.navbar)}>
        <div>#{room.name}</div>
        <div className={css(styles.roomMeta)}>
          {editingTopic
            ?
              <TopicForm
                onSubmit={this.handleTopicUpdate}
                initialValues={{ topic: room.topic }}
                onCancel={() => this.setState({ editingTopic: false })}
              />
            :
              <button
                className={css(styles.topicButton)}
                onClick={() => this.setState({ editingTopic: true })}
              >
                {room.topic ? room.topic : 'General chat and discussion'}
              </button>
          }
        </div>
      </nav>
    );
  }
}

export default RoomNavbar;
