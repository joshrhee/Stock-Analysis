import { combineReducers } from "redux";

const initialState = {
    ClosedPrice: []
}
    
  function reducer(state = initialState, action) {
    if (action.type === "GET_STOCK_INFO") {
      const newState = action.payload;
      return newState;
    }
    return state;
  }

  export default combineReducers({reducer});