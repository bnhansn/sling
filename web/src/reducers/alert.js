const initialState = {
  message: '',
  timeout: null,
  visible: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case 'SHOW_ALERT':
      return {
        ...state,
        visible: true,
        timeout: action.timeout,
        message: action.message,
      };
    case 'HIDE_ALERT':
      return {
        ...state,
        message: '',
        timeout: null,
        visible: false,
      };
    default:
      return state;
  }
}
