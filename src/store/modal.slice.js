import {
  createSlice,
  createSelector
} from "@reduxjs/toolkit"

export const MODAL_FEATURE_KEY = "MODAL";
const { reducer: modalReducer, actions } = createSlice({
  name: MODAL_FEATURE_KEY,
  initialState: {
    loginModalVisable: false,
    phoneModalVisable: true,
    userTagModalVisable: true,
  },
  reducers: {
    setLoginModalVisable: (state, action) => {
      state.loginModalVisable = action.payload;
    },
    setPhoneModalVisable: (state, action) => {
      state.phoneModalVisable = action.payload;
    },
    setUserTagModalVisable: (state, action) => {
      state.userTagModalVisable = action.payload;
    },
  }
});

export const loginModalVisable = createSelector(
  state => state[MODAL_FEATURE_KEY],
  state => state.loginModalVisable
);

export const phoneModalVisable = createSelector(
  state => state[MODAL_FEATURE_KEY],
  state => state.phoneModalVisable
);

export const userTagModalVisable = createSelector(
  state => state[MODAL_FEATURE_KEY],
  state => state.userTagModalVisable
);

export const { setLoginModalVisable, setPhoneModalVisable, setUserTagModalVisable } = actions;
export default modalReducer;