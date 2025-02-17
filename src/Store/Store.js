// store.js
import {configureStore, createSlice} from '@reduxjs/toolkit';

const componentsSlice = createSlice({
  name: 'components',
  initialState: {
    widgets: [
      {
        id: '1',
        x: 0,
        y: 0,
        color: '#FF6F61',
        country: 'USA',
        showDropdown: false,
      },
      {
        id: '2',
        x: 1,
        y: 0,
        color: '#6FA3EF',
        country: 'India',
        showDropdown: false,
      },
      {
        id: '3',
        x: 0,
        y: 1,
        color: '#FFD54F',
        country: 'Canada',
        showDropdown: false,
      },
      {
        id: '4',
        x: 1,
        y: 1,
        color: '#8BC34A',
        country: 'Australia',
        showDropdown: false,
      },
    ], // Default component order
  },
  reducers: {
    setWidgets: (state, action) => {
      state.widgets = action.payload;
    },
  },
});

export const {setWidgets} = componentsSlice.actions;

export const store = configureStore({
  reducer: {
    components: componentsSlice.reducer,
  },
});
