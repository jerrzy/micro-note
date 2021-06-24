import UserActionTypes from "./user.action.types";

const INITIAL_STATE = {
  currentUser: null,
  error: null,
  isFetching: true,
};

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case UserActionTypes.GOOGLE_SIGN_IN_START:
    case UserActionTypes.EMAIL_SIGN_IN_START:
      return {
        ...state,
        isFetching: true,
      };
    case UserActionTypes.SIGN_IN_SUCCESS:
      return {
        ...state,
        currentUser: action.payload,
        error: null,
        isFetching: false,
      };
    case UserActionTypes.SIGN_OUT_SUCCESS:
      return {
        ...state,
        currentUser: null,
        error: null,
        isFetching: false,
      };
    case UserActionTypes.SIGN_IN_FAILURE:
    case UserActionTypes.SIGN_OUT_FAILURE:
    case UserActionTypes.SIGN_UP_FAILURE:
      return {
        ...state,
        error: action.payload,
        isFetching: false,
      };
    case UserActionTypes.CHECK_USER_SESSION:
      return {
        ...state,
        isFetching: true,
      };
    default:
      return state;
  }
};

export default userReducer;
