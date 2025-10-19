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

import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MantineProvider } from '@mantine/core';
import SkillsForm from '../components/SkillsForm';

const renderWithMantine = (ui: React.ReactNode) => {
  return render(<MantineProvider>{ui}</MantineProvider>);
};

describe('SkillsForm', () => {
  it('должен отображать начальные навыки', () => {
    renderWithMantine(<SkillsForm />);
    expect(screen.getByText('TypeScript')).toBeInTheDocument();
    expect(screen.getByText('React')).toBeInTheDocument();
    expect(screen.getByText('Redux')).toBeInTheDocument();
  });

  it('должен добавлять новый навык', async () => {
    renderWithMantine(<SkillsForm />);
    const input = screen.getByPlaceholderText('Навык');
    const addButton = screen.getByText('+');

    await userEvent.type(input, 'NodeJS');
    await userEvent.click(addButton);

    expect(screen.getByText('NodeJS')).toBeInTheDocument();
    expect(input).toHaveValue('');
  });

    it('не должен добавлять пустой или дублирующийся навык', async () => {
    renderWithMantine(<SkillsForm />);
    const input = screen.getByPlaceholderText('Навык');
    const addButton = screen.getByText('+');

    await userEvent.click(addButton);

    expect(screen.getAllByText(/TypeScript|React|Redux/).length).toBe(3);

    await userEvent.type(input, 'React');
    await userEvent.click(addButton);
    const reactBadges = screen.getAllByText('React');
    expect(reactBadges.length).toBe(1);
    });

  it('должен удалять навык', async () => {
    renderWithMantine(<SkillsForm />);
    
    const badgeElement = screen.getByText('React').closest('.mantine-Badge-root');

    if (!badgeElement) throw new Error('Badge не найден');

    const badge = badgeElement as HTMLElement;

    const closeButton = within(badge).getByRole('button');
    
    await userEvent.click(closeButton);

    expect(screen.queryByText('React')).not.toBeInTheDocument();
  });
});
