const INITIAL_STATE = {
  count: 0,
};

const testReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "test_action":
      return {
        ...state,
        count: state.count + 1,
      };
    default:
      return state;
  }
};

export default testReducer;
