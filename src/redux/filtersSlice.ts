
import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

interface FiltersState {
  city: string;
}

const initialState: FiltersState = {
  city: 'Все города',
};

export const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setCity: (state, action: PayloadAction<string>) => {
      state.city = action.payload;
    },
  },
});

export const { setCity } = filtersSlice.actions;
export default filtersSlice.reducer;
