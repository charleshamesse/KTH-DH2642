import _ from 'lodash';
import { FETCH_PROFILE, FULFILLED, PENDING, REJECTED } from '../actions';

const initialState = {
  profile: {},
  loadingProfile: true,
  error: false,
};


export default function (state = initialState, action) {
  console.log('Profile. Action received:', action);

  switch (action.type) {
    case FETCH_PROFILE + PENDING:
      return { ...state, loadingProfile: true };

    case FETCH_PROFILE + FULFILLED: {
      const profile = action.payload.val();
      return {
        ...state,
        loadingProfile: false,
        profile,
        error: false,
      };
    }

    case FETCH_PROFILE + REJECTED:
      return { ...state, loadingProfile: false, error: true };

    default: {
      return state;
    }
  }
}
