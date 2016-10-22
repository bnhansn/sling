// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { connectToChannel, leaveChannel } from '../../actions/room';

type RoomType = {
  id: number,
  name: string,
}

type Props = {
  socket: any,
  channel: any,
  room: RoomType,
  params: {
    id: number,
  },
  connectToChannel: () => void,
  leaveChannel: () => void,
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

  render() {
    return (
      <div>{this.props.room.name}</div>
    );
  }
}

export default connect(
  state => ({
    room: state.room.currentRoom,
    socket: state.session.socket,
    channel: state.room.channel,
  }),
  { connectToChannel, leaveChannel }
)(Room);
