import {
  createSlice,
} from "@reduxjs/toolkit"

export const USER_FEATURE_KEY = "USER";
const { reducer: userReducer, actions } = createSlice({
  name: USER_FEATURE_KEY,
  initialState: {
    userInfo: {},
    userIsLogin: false,
  },
  reducers: {
    setUserInfo: (state, action) => {
      state.userIsLogin = !!action.payload.id;
      state.userInfo = Object.assign(state.userInfo, action.payload);
    },
    updateUserInfo: (state, action) => {
      state.userInfo = Object.assign(state.userInfo, action.payload);
    }
  }
});

export const { setUserInfo } = actions
export default userReducer;


