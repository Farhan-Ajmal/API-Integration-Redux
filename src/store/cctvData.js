import { createSlice } from "@reduxjs/toolkit";

const cctvDataSlice = createSlice({
  name: "cctvData",
  initialState: {
    items: [],
  },
  reducers: {
    addCctvData(state, action) {
        const cctvData = action.payload;
        console.log("cctvData in redux",cctvData);
        state.items.push(cctvData)
    },
    // logout(state) {
    //   state.isLoggedIn = false;
    // },
  },
});

export const cctvDataActions = cctvDataSlice.actions;

export default cctvDataSlice;
