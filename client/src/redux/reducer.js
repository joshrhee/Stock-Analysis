import { combineReducers } from "redux";

const initialState = {
    adjClose1: [],
    adjClose2: [],
    dates1: [],
    dates2: [],
}
    
  function reducer(state = initialState, action) {
    if (action.type === "GET_STOCK_INFO") {
      const newState = action.payload;
      return newState;
    }
    return state;
  }

  export default combineReducers({reducer});