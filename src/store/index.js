// store.js

import { configureStore } from '@reduxjs/toolkit';
import cctvReducer from './cctvSlice';

const store = configureStore({
  reducer: {
    cctv: cctvReducer,
  },
});

export default store;
