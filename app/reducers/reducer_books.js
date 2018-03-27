import _ from "lodash";
import { FETCH_BOOKS, FULFILLED, PENDING } from "../actions";

export default function (state = {}, action) {
    console.log("Action received:", action)
    
    switch (action.type) {
        /*
      case DELETE_POST:
        return _.omit(state, action.payload);
      case FETCH_POST:
        return { ...state, [action.payload.data.id]: action.payload.data };
        */    
        case FETCH_BOOKS + PENDING:
            return {...state, loading: true}

        case FETCH_BOOKS + FULFILLED:
            // console.log('reducer', action.payload.data.items) 
            return {
                ...state, 
                loading: false,
                recommendations: _.mapKeys(action.payload.data.items, "id")
            }

        default:
            return state;
    }
        
}