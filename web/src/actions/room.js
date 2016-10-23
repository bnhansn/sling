import { reset } from 'redux-form';
import { Presence } from 'phoenix';
import api from '../api';

const syncPresentUsers = (dispatch, presences) => {
  const presentUsers = [];
  Presence.list(presences, (id, { metas: [first] }) => first.user)
          .map((user) => presentUsers.push(user));
  dispatch({ type: 'ROOM_PRESENCE_UPDATE', presentUsers });
};

export function connectToChannel(socket, roomId) {
  return (dispatch) => {
    if (!socket) { return false; }
    const channel = socket.channel(`rooms:${roomId}`);
    let presences = {};

    channel.on('presence_state', (state) => {
      presences = Presence.syncState(presences, state);
      syncPresentUsers(dispatch, presences);
    });

    channel.on('presence_diff', (diff) => {
      presences = Presence.syncDiff(presences, diff);
      syncPresentUsers(dispatch, presences);
    });

    channel.on('message_created', (message) => {
      dispatch({ type: 'MESSAGE_CREATED', message });
    });

    channel.join().receive('ok', (response) => {
      dispatch({ type: 'ROOM_CONNECTED_TO_CHANNEL', response, channel });
    });

    return false;
  };
}

export function leaveChannel(channel) {
  return (dispatch) => {
    if (channel) {
      channel.leave();
    }
    dispatch({ type: 'USER_LEFT_ROOM' });
  };
}

export function createMessage(channel, data) {
  return (dispatch) => new Promise((resolve, reject) => {
    channel.push('new_message', data)
      .receive('ok', () => resolve(
        dispatch(reset('newMessage'))
      ))
      .receive('error', () => reject());
  });
}

export function loadOlderMessages(roomId, params) {
  return (dispatch) => {
    dispatch({ type: 'FETCH_MESSAGES_REQUEST' });
    return api.fetch(`/rooms/${roomId}/messages`, params)
      .then((response) => {
        dispatch({ type: 'FETCH_MESSAGES_SUCCESS', response });
      })
      .catch(() => {
        dispatch({ type: 'FETCH_MESSAGES_FAILURE' });
      });
  };
}

export function updateRoom(roomId, data) {
  return (dispatch) => api.patch(`/rooms/${roomId}`, data)
    .then((response) => {
      dispatch({ type: 'UPDATE_ROOM_SUCCESS', response });
    });
}
