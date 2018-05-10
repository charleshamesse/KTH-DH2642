import _ from 'lodash';
import { LOGIN, LOGOUT, FULFILLED, PENDING, REJECTED } from '../actions';

const initialState = {
  loading: true,
  error: false,
};


export default function (state = initialState, action) {
  console.log('Auth. Action received:', action);

  switch (action.type) {
    case LOGIN + PENDING:
      return { ...state, loadingProfile: true };

    case LOGIN + FULFILLED: {
      return {
        ...state,
        loading: false,
        error: false,
      };
    }

    case LOGIN + REJECTED:
      return { ...state, loading: false, error: true };

    default: {
      return state;
    }
  }
}
