// @flow
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { css, StyleSheet } from 'aphrodite';
import { fetchRooms, createRoom, joinRoom } from '../../actions/rooms';
import NewRoomForm from '../../components/NewRoomForm';
import Navbar from '../../components/Navbar';
import RoomListItem from '../../components/RoomListItem';
import Pager from '../../components/Pager';
import { Room, Pagination } from '../../types';

const styles = StyleSheet.create({
  card: {
    maxWidth: '500px',
    padding: '3rem 4rem',
    margin: '2rem auto',
  },
});

type Props = {
  rooms: Array<Room>,
  currentUserRooms: Array<Room>,
  fetchRooms: () => void,
  createRoom: () => void,
  joinRoom: () => void,
  newRoomErrors: Array<string>,
  pagination: Pagination,
}

type State = {
  page: number,
  page_size: number,
}

class Home extends Component {
  static contextTypes = {
    router: PropTypes.object,
  }

  constructor(props: Props) {
    super(props);
    this.state = {
      page: 1,
      page_size: 5,
    };
  }

  state: State

  componentDidMount() {
    this.loadRooms();
  }

  props: Props

  loadRooms() {
    const { page, page_size } = this.state;
    this.props.fetchRooms({ page, page_size });
  }

  handlePagerClick = (direction) => {
    if (direction === 'next') {
      this.setState({
        page: this.state.page + 1,
      }, () => { this.loadRooms(); });
    } else if (direction === 'prev') {
      this.setState({
        page: this.state.page - 1,
      }, () => { this.loadRooms(); });
    }
  }

  handleNewRoomSubmit = (data) => this.props.createRoom(data, this.context.router);

  handleRoomJoin = (roomId) => this.props.joinRoom(roomId, this.context.router);

  renderRooms() {
    const currentUserRoomIds = [];
    this.props.currentUserRooms.map((room) => currentUserRoomIds.push(room.id));

    return this.props.rooms.map((room) =>
      <RoomListItem
        key={room.id}
        room={room}
        onRoomJoin={this.handleRoomJoin}
        currentUserRoomIds={currentUserRoomIds}
      />
    );
  }

  render() {
    return (
      <div style={{ flex: '1', overflowY: 'auto' }}>
        <Navbar />
        <div className={`card ${css(styles.card)}`}>
          <h3 style={{ marginBottom: '2rem', textAlign: 'center' }}>Create a new room</h3>
          <NewRoomForm onSubmit={this.handleNewRoomSubmit} errors={this.props.newRoomErrors} />
        </div>
        <div className={`card ${css(styles.card)}`}>
          <h3 style={{ marginBottom: '2rem', textAlign: 'center' }}>Join a room</h3>
          <div style={{ marginBottom: '1rem' }}>
            {this.renderRooms()}
          </div>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <Pager pagination={this.props.pagination} onPagerClick={this.handlePagerClick} />
          </div>
        </div>
      </div>
    );
  }
}

export default connect(
  (state) => ({
    rooms: state.rooms.all,
    currentUserRooms: state.rooms.currentUserRooms,
    newRoomErrors: state.rooms.newRoomErrors,
    pagination: state.rooms.pagination,
  }),
  { fetchRooms, createRoom, joinRoom }
)(Home);
