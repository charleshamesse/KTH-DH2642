import _ from "lodash";
import { FETCH_BOOKS, RECV_BOOKS } from "../actions";

export default function (state = {}, action) {
    console.log("Action received:", action)
    
    switch (action.type) {
        /*
      case DELETE_POST:
        return _.omit(state, action.payload);
      case FETCH_POST:
        return { ...state, [action.payload.data.id]: action.payload.data };
        */    
        case FETCH_BOOKS:
            // console.log('reducer', action.payload.data.items)
            return _.mapKeys(action.payload.data.items, "id"); //action.payload.data
                    
        default:
            return state;
    }
        
}