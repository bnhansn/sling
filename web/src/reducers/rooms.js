const initialState = {
  all: [],
  currentUserRooms: [],
  newRoomErrors: [],
  pagination: {
    total_pages: 0,
    total_entries: 0,
    page_size: 0,
    page_number: 0,
  },
};

export default function (state = initialState, action) {
  switch (action.type) {
    case 'FETCH_ROOMS_SUCCESS':
      return {
        ...state,
        all: action.response.data,
        pagination: action.response.pagination,
      };
    case 'FETCH_USER_ROOMS_SUCCESS':
      return {
        ...state,
        currentUserRooms: action.response.data,
      };
    case 'CREATE_ROOM_SUCCESS':
      return {
        ...state,
        all: [
          action.response.data,
          ...state.all,
        ],
        currentUserRooms: [
          ...state.currentUserRooms,
          action.response.data,
        ],
        newRoomErrors: [],
      };
    case 'CREATE_ROOM_FAILURE':
      return {
        ...state,
        newRoomErrors: action.error.errors,
      };
    case 'ROOM_JOINED':
      return {
        ...state,
        currentUserRooms: [
          ...state.currentUserRooms,
          action.response.data,
        ],
      };
    default:
      return state;
  }
}
