import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  selectedPhases: [],
  selectedSectors: [],
};

const cctvSlice = createSlice({
  name: 'cctv',
  initialState,
  reducers: {
    togglePhase: (state, action) => {
      const phaseIndex = state.selectedPhases.indexOf(action.payload);
      if (phaseIndex === -1) {
        state.selectedPhases.push(action.payload);
      } else {
        state.selectedPhases.splice(phaseIndex, 1);
      }
    },
    toggleSector: (state, action) => {
      const sectorIndex = state.selectedSectors.indexOf(action.payload);
      if (sectorIndex === -1) {
        state.selectedSectors.push(action.payload);
      } else {
        state.selectedSectors.splice(sectorIndex, 1);
      }
    },
  },
});

export const { togglePhase, toggleSector } = cctvSlice.actions;
export default cctvSlice.reducer;

// cctvSlice.js

// import { createSlice } from '@reduxjs/toolkit';

// const initialState = {
//   selectedPhases: [],
//   selectedSectors: [],
// };

// const cctvSlice = createSlice({
//   name: 'cctv',
//   initialState,
//   reducers: {
//     addSelectedPhase: (state, action) => {
//       state.selectedPhases.push(action.payload);
//     },
//     removeSelectedPhase: (state, action) => {
//       state.selectedPhases = state.selectedPhases.filter((phase) => phase !== action.payload);
//     },
//     addSelectedSector: (state, action) => {
//       state.selectedSectors.push(action.payload);
//     },
//     removeSelectedSector: (state, action) => {
//       state.selectedSectors = state.selectedSectors.filter((sector) => sector !== action.payload);
//     },
//   },
// });

// export const { addSelectedPhase, removeSelectedPhase, addSelectedSector, removeSelectedSector } = cctvSlice.actions;
// export default cctvSlice.reducer;
