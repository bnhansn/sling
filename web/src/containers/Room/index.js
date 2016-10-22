// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { connectToChannel, leaveChannel, createMessage, loadOlderMessages } from '../../actions/room';
import MessageList from '../../components/MessageList';
import MessageForm from '../../components/MessageForm';
import RoomNavbar from '../../components/RoomNavbar';
import RoomSidebar from '../../components/RoomSidebar';

type MessageType = {
  id: number,
}

type Props = {
  socket: any,
  channel: any,
  room: Object,
  params: {
    id: number,
  },
  connectToChannel: () => void,
  leaveChannel: () => void,
  createMessage: () => void,
  messages: Array<MessageType>,
  presentUsers: Array,
  currentUser: Object,
  loadingOlderMessages: boolean,
  pagination: {
    total_pages: number,
    total_entries: number,
    page_size: number,
    page_number: number,
  },
  loadOlderMessages: () => void,
}

class Room extends Component {
  componentDidMount() {
    this.props.connectToChannel(this.props.socket, this.props.params.id);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.params.id !== this.props.params.id) {
      this.props.leaveChannel(this.props.channel);
      this.props.connectToChannel(nextProps.socket, nextProps.params.id);
    }
    if (!this.props.socket && nextProps.socket) {
      this.props.connectToChannel(nextProps.socket, nextProps.params.id);
    }
  }

  componentWillUnmount() {
    this.props.leaveChannel(this.props.channel);
  }

  props: Props

  handleLoadMore = () =>
    this.props.loadOlderMessages(
      this.props.params.id,
      { last_seen_id: this.props.messages[0].id }
    )

  handleMessageCreate = (data) => {
    this.props.createMessage(this.props.channel, data);
    this.messageList.scrollToBottom();
  }

  render() {
    const moreMessages = this.props.pagination.total_pages > this.props.pagination.page_number;

    return (
      <div style={{ display: 'flex', height: '100vh' }}>
        <RoomSidebar
          room={this.props.room}
          currentUser={this.props.currentUser}
          presentUsers={this.props.presentUsers}
        />
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <RoomNavbar room={this.props.room} />
          <MessageList
            moreMessages={moreMessages}
            messages={this.props.messages}
            onLoadMore={this.handleLoadMore}
            ref={(c) => { this.messageList = c; }}
            loadingOlderMessages={this.props.loadingOlderMessages}
          />
          <MessageForm onSubmit={this.handleMessageCreate} />
        </div>
      </div>
    );
  }
}

export default connect(
  state => ({
    room: state.room.currentRoom,
    socket: state.session.socket,
    channel: state.room.channel,
    messages: state.room.messages,
    presentUsers: state.room.presentUsers,
    currentUser: state.session.currentUser,
    pagination: state.room.pagination,
    loadingOlderMessages: state.room.loadingOlderMessages,
  }),
  { connectToChannel, leaveChannel, createMessage, loadOlderMessages }
)(Room);
