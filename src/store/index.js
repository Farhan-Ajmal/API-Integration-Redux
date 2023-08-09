// store.js

import { configureStore } from '@reduxjs/toolkit';
import cctvReducer from './cctvSlice';
import cctvDataSlice from './cctvData';

const store = configureStore({
  reducer: {
    cctv: cctvReducer,
    cctvData: cctvDataSlice.reducer,
  },
});

export default store;
