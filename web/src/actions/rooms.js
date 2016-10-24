import api from '../api';

export function fetchRooms(params) {
  return (dispatch) => api.fetch('/rooms', params)
    .then((response) => {
      dispatch({ type: 'FETCH_ROOMS_SUCCESS', response });
    });
}

export function fetchUserRooms(userId) {
  return (dispatch) => api.fetch(`/users/${userId}/rooms`)
    .then((response) => {
      dispatch({ type: 'FETCH_USER_ROOMS_SUCCESS', response });
    });
}

export function createRoom(data, router) {
  return (dispatch) => api.post('/rooms', data)
    .then((response) => {
      dispatch({ type: 'CREATE_ROOM_SUCCESS', response });
      router.transitionTo(`/r/${response.data.id}`);
    })
    .catch((error) => {
      dispatch({ type: 'CREATE_ROOM_FAILURE', error });
    });
}

export function joinRoom(roomId, router) {
  return (dispatch) => api.post(`/rooms/${roomId}/join`)
    .then((response) => {
      dispatch({ type: 'ROOM_JOINED', response });
      router.transitionTo(`/r/${response.data.id}`);
    });
}
