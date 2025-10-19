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
import { describe, it, expect } from 'vitest';
import { MantineProvider } from '@mantine/core';
import SearchSection from '../components/SearchSection';

const renderWithMantine = (ui: React.ReactNode) => {
  return render(<MantineProvider>{ui}</MantineProvider>);
};

describe('SearchSection', () => {
  it('должен отображать заголовок "Список вакансий"', () => {
    renderWithMantine(<SearchSection />);
    expect(screen.getByText('Список вакансий')).toBeInTheDocument();
  });

  it('должен отображать подзаголовок с профессией', () => {
    renderWithMantine(<SearchSection />);
    expect(screen.getByText('по профессии Frontend-разработчик')).toBeInTheDocument();
  });

  it('должен отображать InputSearch с placeholder', () => {
    renderWithMantine(<SearchSection />);
    const input = screen.getByPlaceholderText('Должность или название вакансии');
    expect(input).toBeInTheDocument();
  });

it('должен отображать иконку поиска внутри InputSearch', () => {
  renderWithMantine(<SearchSection />);
  const icon = document.querySelector('svg.tabler-icon-search'); 
  expect(icon).toBeInTheDocument();
});

  it('должна отображаться кнопка "Найти"', () => {
    renderWithMantine(<SearchSection />);
    const button = screen.getByRole('button', { name: 'Найти' });
    expect(button).toBeInTheDocument();
  });
});
