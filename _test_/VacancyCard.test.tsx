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
import { describe, it, expect, vi } from 'vitest';
import { MantineProvider } from '@mantine/core';
import VacancyCard from '../components/VacancyCard';


vi.mock('../components/UI/WorkFormatBadge.tsx', () => {
  return {
    default: ({ schedule }: { schedule?: { name?: string } }) => (
      <div data-testid="work-format-badge">{schedule?.name ?? 'Не указано'}</div>
    ),
  };
});

const renderWithMantine = (ui: React.ReactNode) => {
  return render(<MantineProvider>{ui}</MantineProvider>);
};

describe('VacancyCard', () => {
  const defaultProps = {
    title: 'Frontend Developer',
    salary: { from: 100000, to: 150000, currency: '₽' },
    experience: '3+ года',
    company: 'Tech Company',
    city: 'Москва',
    schedule: { name: 'Удаленная' },
  };

  it('должна отображать заголовок вакансии', () => {
    renderWithMantine(<VacancyCard {...defaultProps} />);
    expect(screen.getByText(defaultProps.title)).toBeInTheDocument();
  });

  it('должна отображать зарплату корректно', () => {
    renderWithMantine(<VacancyCard {...defaultProps} />);
    expect(screen.getByText('100000 – 150000 ₽')).toBeInTheDocument();
  });

  it('должна отображать опыт', () => {
    renderWithMantine(<VacancyCard {...defaultProps} />);
    expect(screen.getByText(defaultProps.experience)).toBeInTheDocument();
  });

  it('должна отображать компанию', () => {
    renderWithMantine(<VacancyCard {...defaultProps} />);
    expect(screen.getByText(defaultProps.company)).toBeInTheDocument();
  });

  it('должна отображать город', () => {
    renderWithMantine(<VacancyCard {...defaultProps} />);
    expect(screen.getByText(defaultProps.city)).toBeInTheDocument();
  });

  it('должна отображать кнопки', () => {
    renderWithMantine(<VacancyCard {...defaultProps} />);
    expect(screen.getByText('Смотреть вакансию')).toBeInTheDocument();
    expect(screen.getByText('Откликнуться')).toBeInTheDocument();
  });

  it('должна отображать WorkFormatBadge', () => {
    renderWithMantine(<VacancyCard {...defaultProps} />);
    expect(screen.getByTestId('work-format-badge')).toBeInTheDocument();
    expect(screen.getByText('Удаленная')).toBeInTheDocument();
  });

  it('должна показывать "Зарплата не указана", если salary не передан', () => {
    renderWithMantine(<VacancyCard {...defaultProps} salary={undefined} />);
    expect(screen.getByText('Зарплата не указана')).toBeInTheDocument();
  });

  it('должна показывать "не указан" для опыта, если experience не передан', () => {
    renderWithMantine(<VacancyCard {...defaultProps} experience={undefined} />);
    expect(screen.getByText('не указан')).toBeInTheDocument();
  });
});
