import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';

type Vacancy = {
  id: string;
  name: string;
  area: { name: string };
  employer: { name: string };
  salary?: { from?: number; to?: number; currency?: string } | null;
  experience: { name: string };
  schedule: { name: string };
  alternate_url: string;
};

type VacanciesResponse = {
  items: Vacancy[];
  found: number;
  pages: number;
};

interface VacanciesState {
  vacancies: Vacancy[];
  found: number;
  pages: number;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: VacanciesState = {
  vacancies: [],
  found: 0,
  pages: 0,
  status: 'idle',
  error: null,
};

export const fetchVacancies = 
  createAsyncThunk<VacanciesResponse, { page: number; city?: string }>(
  'vacancies/fetch',
  async ({ page, city }, { rejectWithValue }) => {
    try {
        const params: Record<string, string | number | undefined>= {
        industry: 7,
        professional_role: 96,
        per_page: 10,
        page,
      };

      if (city) {
        switch (city) {
          case 'Москва':
            params.area = 1; break;
          case 'Санкт-Петербург':
            params.area = 2; break;
        }
      }

      const response = await axios.get<VacanciesResponse>('https://api.hh.ru/vacancies', {
        params,
      });
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
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchVacancies.pending, (state) => {
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

export default vacanciesSlice.reducer;
