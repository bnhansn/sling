const initialState = {
  channel: null,
  currentRoom: {},
  messages: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case 'ROOM_CONNECTED_TO_CHANNEL':
      return {
        ...state,
        channel: action.channel,
        currentRoom: action.response.room,
        messages: action.response.messages.reverse(),
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
    default:
      return state;
  }
}
