import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';

export type Vacancy = {
  id: string;
  name: string;
  area: { name: string };
  employer: { name: string };
  salary?: { from?: number; to?: number; currency?: string } | null;
  experience: { name: string };
  schedule: { name: string };
  key_skills: { name: string }[];
  snippet?: { requirement?: string; responsibility?: string };
  alternate_url: string;
};

type VacanciesResponse = {
  items: Vacancy[];
  found: number;
  pages: number;
};

interface VacanciesState {
  vacancies: Vacancy[];
  selectedVacancy: Vacancy | null;
  found: number;
  pages: number;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: VacanciesState = {
  vacancies: [],
  selectedVacancy: null,
  found: 0,
  pages: 0,
  status: 'idle',
  error: null,
};

// --- Thunk для получения вакансий
export const fetchVacancies = createAsyncThunk<
  VacanciesResponse,
  { page: number; city?: string; skills?: string[]; searchText?: string }
>(
  'vacancies/fetch',
  async ({ page, city, skills, searchText }, { rejectWithValue }) => {
    try {
      const params: Record<string, string | number | undefined> = {
        industry: 7,
        professional_role: 96,
        per_page: 10,
        page,
      };

      // --- фильтр по городу
      if (city && city !== 'Все города') {
        switch (city) {
          case 'Москва':
            params.area = 1;
            break;
          case 'Санкт-Петербург':
            params.area = 2;
            break;
        }
      }

      // --- объединяем skills и searchText в один параметр text
      const textParts: string[] = [];

      if (skills && skills.length > 0) {
        textParts.push(skills.map(s => `keyskills:${s}`).join(' AND '));
      }

      if (searchText) {
        textParts.push(searchText);
      }

      if (textParts.length > 0) {
        params.text = textParts.join(' AND ');
      }

      const response = await axios.get<VacanciesResponse>(
        'https://api.hh.ru/vacancies',
        { params }
      );
console.log(response.data)
      return response.data;
    } catch (err) {
      const error = err as AxiosError<{ message?: string }>;
      return rejectWithValue(error.message || 'Ошибка при загрузке вакансий');
    }
  }
);

const vacanciesSlice = createSlice({
  name: 'vacancies',
  initialState,
  reducers: {
    setSelectedVacancy(state, action: PayloadAction<Vacancy>) {
      state.selectedVacancy = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchVacancies.pending, state => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchVacancies.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.vacancies = action.payload.items;
        state.found = action.payload.found;
        state.pages = action.payload.pages;
      })
      .addCase(fetchVacancies.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      });
  },
});

export const { setSelectedVacancy } = vacanciesSlice.actions;
export default vacanciesSlice.reducer;
