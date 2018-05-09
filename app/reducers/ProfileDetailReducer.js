import _ from 'lodash';
import { FETCH_PROFILE, FULFILLED, PENDING, FETCH_COMMENTS } from '../actions';

const initialState = {
  profile: {},
  loadingProfile: true,
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
      };
    }
    default: {
      return state;
    }
  }
}
