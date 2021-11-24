import { createSlice, createSelector } from "@reduxjs/toolkit";

export const USER_FEATURE_KEY = "USER";
const { reducer: userReducer, actions } = createSlice({
  name: USER_FEATURE_KEY,
  initialState: {},
  reducers: {
    setUserInfo: (state, action) => {
      state = Object.assign(state, action.payload);
    },
    delUserInfo: (state, action) => {
      return {};
    },
  },
});

export const user = createSelector(
  (state) => state[USER_FEATURE_KEY],
  (userInfo) => userInfo
);
export const isVip = createSelector(
  (state) => state[USER_FEATURE_KEY].vip_expired,
  (vipExpired) => {
    return vipExpired
      ? new Date(vipExpired).valueOf() > new Date().valueOf()
      : false;
  }
);
export const isLogin = createSelector(
  (state) => state[USER_FEATURE_KEY],
  (userInfo) => (userInfo.id ? true : false)
);
export const isDesigner = createSelector(
  (state) => state[USER_FEATURE_KEY],
  (userInfo) => (userInfo.jobs ? userInfo.jobs.length > 0 : false)
);

export const { setUserInfo, delUserInfo } = actions;
export default userReducer;
