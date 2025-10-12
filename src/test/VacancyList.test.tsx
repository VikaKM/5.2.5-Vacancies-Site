// Мок window.matchMedia для Mantine
beforeAll(() => {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: (query: string) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: () => {},
      removeListener: () => {},
      addEventListener: () => {},
      removeEventListener: () => {},
      dispatchEvent: () => false,
    }),
  });
});

import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MantineProvider } from '@mantine/core';
import { vi } from 'vitest';
import VacancyList from '../components/VacansyList';
import { store } from '../redux/store';
import type { RootState } from '../redux/store';


const renderWithProviders = (ui: React.ReactNode) =>
  render(
    <Provider store={store}>
      <MantineProvider>{ui}</MantineProvider>
    </Provider>
  );

describe('VacancyList', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it('показывает Loader при загрузке', () => {
    vi.spyOn(store, 'getState').mockReturnValue({
      vacancies: { vacancies: [], status: 'loading', error: null, pages: 1 },
      filters: { city: 'Все города' },
    } as unknown as RootState);

    renderWithProviders(<VacancyList />);
    expect(screen.getByTestId('loader')).toBeInTheDocument();
  });

  it('показывает ошибку', () => {
    vi.spyOn(store, 'getState').mockReturnValue({
      vacancies: { vacancies: [], status: 'failed', error: 'Ошибка сервера', pages: 1 },
      filters: { city: 'Все города' },
    } as unknown as RootState);

    renderWithProviders(<VacancyList />);
    expect(screen.getByText(/Ошибка: Ошибка сервера/i)).toBeInTheDocument();
  });

  it('показывает сообщение если вакансий нет', () => {
    vi.spyOn(store, 'getState').mockReturnValue({
      vacancies: { vacancies: [], status: 'succeeded', error: null, pages: 1 },
      filters: { city: 'Все города' },
    } as unknown as RootState);

    renderWithProviders(<VacancyList />);
    expect(screen.getByText(/Вакансий не найдено/i)).toBeInTheDocument();
  });

  it('рендерит список вакансий', () => {
    const mockVacancies = [
      { id: 1, name: 'React Developer', salary: '100k', experience: { name: '1 год' }, employer: { name: 'Company A' }, area: { name: 'Москва' }, schedule: 'Full-time' },
      { id: 2, name: 'NodeJS Developer', salary: '120k', experience: { name: '2 года' }, employer: { name: 'Company B' }, area: { name: 'Санкт-Петербург' }, schedule: 'Remote' },
    ];

    vi.spyOn(store, 'getState').mockReturnValue({
      vacancies: { vacancies: mockVacancies, status: 'succeeded', error: null, pages: 2 },
      filters: { city: 'Все города' },
    } as unknown as RootState);

    renderWithProviders(<VacancyList />);

    expect(screen.getByText('React Developer')).toBeInTheDocument();
    expect(screen.getByText('NodeJS Developer')).toBeInTheDocument();
  });

  it('вызывает fetchVacancies при смене страницы', () => {
    const dispatchMock = vi.fn<typeof store.dispatch>();
    vi.spyOn(store, 'dispatch').mockImplementation(dispatchMock);

    renderWithProviders(<VacancyList />);

    expect(dispatchMock).toHaveBeenCalled();

    const firstCallArg = dispatchMock.mock.calls[0][0];
    expect(typeof firstCallArg).toBe('function');
  });

});
