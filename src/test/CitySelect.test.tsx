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

import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { MantineProvider } from '@mantine/core';
import filtersReducer from '../redux/filtersSlice';
import CitySelect from '../components/CitySelect';

class ResizeObserverMock implements ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
}
global.ResizeObserver = ResizeObserverMock;

const renderWithProviders = (ui: React.ReactNode) => {
  const store = configureStore({
    reducer: { filters: filtersReducer },
  });
  return {
    ...render(
      <Provider store={store}>
        <MantineProvider>{ui}</MantineProvider>
      </Provider>
    ),
    store,
  };
};

describe('CitySelect', () => {
  it('рендерится с placeholder и начальным значением', () => {
    renderWithProviders(<CitySelect />);
    expect(screen.getByPlaceholderText('Выберите город')).toBeInTheDocument();
  });

  it('выбирает город и диспатчит setCity', async () => {
    const { store } = renderWithProviders(<CitySelect />);
    
    const input = screen.getByPlaceholderText('Выберите город');

    await userEvent.click(input);

    const option = screen.getByText('Москва');
    await userEvent.click(option);

    expect(store.getState().filters.city).toBe('Москва');
  });

    it('возвращается к "Все города" при выборе пустого значения', async () => {
    const { store } = renderWithProviders(<CitySelect />);
    const input = screen.getByPlaceholderText('Выберите город');

    await userEvent.click(input);
    const option = screen.getByText('Все города');
    await userEvent.click(option);

    expect(store.getState().filters.city).toBe('Все города');
    });
});

