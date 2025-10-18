import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

interface FiltersState {
  city: string;
  skills: string[];
  searchText: string;
}

const initialState: FiltersState = {
  city: 'Все города',
  skills: [], 
  searchText: '',
};

export const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setCity(state, action: PayloadAction<string>) {
      state.city = action.payload;
    },
    setSkills(state, action: PayloadAction<string[]>) {
      state.skills = action.payload;
    },
    setSearchText(state, action: PayloadAction<string>) {   
      state.searchText = action.payload;
    },
  },
});

export const { setCity, setSkills, setSearchText } = filtersSlice.actions;
export default filtersSlice.reducer;
