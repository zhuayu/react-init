import * as constants from './constants';
import { fromJS } from 'immutable';

const defaultState = fromJS({
  isLogin: false,
  list:[]
});

export default ( state = defaultState, action) => {
  switch(action.type) {
    case constants.TOGGLE_LOGIN:
      let isLogin = state.get('isLogin');
      return state.set('isLogin', !isLogin);
    case constants.TEST_AXIOS:
      return state.set('list',action.data);
    default:
      return state;
  }
}