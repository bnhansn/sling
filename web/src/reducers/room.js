const initialState = {
  channel: null,
  currentRoom: {},
  messages: [],
  presentUsers: [],
  loadingOlderMessages: false,
  pagination: {
    total_pages: 0,
    total_entries: 0,
    page_size: 0,
    page_number: 0,
  },
};

export default function (state = initialState, action) {
  switch (action.type) {
    case 'ROOM_CONNECTED_TO_CHANNEL':
      return {
        ...state,
        channel: action.channel,
        currentRoom: action.response.room,
        messages: action.response.messages.reverse(),
        pagination: action.response.pagination,
      };
    case 'USER_LEFT_ROOM':
      return initialState;
    case 'MESSAGE_CREATED':
      return {
        ...state,
        messages: [
          ...state.messages,
          action.message,
        ],
      };
    case 'ROOM_PRESENCE_UPDATE':
      return {
        ...state,
        presentUsers: action.presentUsers,
      };
    case 'FETCH_MESSAGES_REQUEST':
      return {
        ...state,
        loadingOlderMessages: true,
      };
    case 'FETCH_MESSAGES_SUCCESS':
      return {
        ...state,
        messages: [
          ...action.response.data.reverse(),
          ...state.messages,
        ],
        pagination: action.response.pagination,
        loadingOlderMessages: false,
      };
    case 'FETCH_MESSAGES_FAILURE':
      return {
        ...state,
        loadingOlderMessages: false,
      };
    case 'UPDATE_ROOM_SUCCESS':
      return {
        ...state,
        currentRoom: action.response.data,
      };
    default:
      return state;
  }
}
