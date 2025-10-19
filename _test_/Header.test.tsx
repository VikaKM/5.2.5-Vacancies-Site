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
import { AppShell, MantineProvider } from '@mantine/core';
import Header from '../components/Header';

const renderWithMantine = (ui: React.ReactNode) => {
  return render(
    <MantineProvider>
        <AppShell>
            {ui}
        </AppShell>
    </MantineProvider>
   );
};

describe('Header', () => {
  it('должен отображать логотип', () => {
    renderWithMantine(<Header />);
    const logo = screen.getByAltText('Логотип');
    expect(logo).toBeInTheDocument();
  });

  it('должен отображать текст рядом с логотипом', () => {
    renderWithMantine(<Header />);
    expect(screen.getByText('.FrontEnd')).toBeInTheDocument();
  });

  it('должна отображаться ссылка на вакансии', () => {
    renderWithMantine(<Header />);
    const vacanciesLink = screen.getByText('Вакансии FE');
    expect(vacanciesLink).toBeInTheDocument();
    expect(vacanciesLink.closest('a')).toHaveAttribute('href', '/page');

    const iconCircle = screen.getByRole('img', { hidden: true }); 
    expect(iconCircle).toBeInTheDocument();
  });

  it('должна отображаться ссылка "Обо мне"', () => {
    renderWithMantine(<Header />);
    const aboutLink = screen.getByText('Обо мне');
    expect(aboutLink).toBeInTheDocument();
    expect(aboutLink.closest('a')).toHaveAttribute('href', '/about');

    const iconUser = screen.getByRole('img', { hidden: true });
    expect(iconUser).toBeInTheDocument();
  });
});

