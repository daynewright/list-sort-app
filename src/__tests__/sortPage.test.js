import { screen, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SortPage from '../components/SortPage';

describe('User can interact with sorting list', () => {

  test('user can add to the list', () => {
    render(<SortPage />);
  
    expect(screen.getByText('Sorted List')).toBeInTheDocument();

    const input = screen.getByRole('textbox', { name: 'list-item-input' });
    userEvent.type(input, 'Dayne');
    userEvent.type(input, '{enter}');

    expect(screen.getByText('Dayne')).toBeInTheDocument();
  });

  test('user can clear the list and input with clear button', () => {
    render(<SortPage />);

    expect(screen.getByText('Sorted List')).toBeInTheDocument();

    const input = screen.getByRole('textbox', { name: 'list-item-input' });
    userEvent.type(input, 'Dayne');
    userEvent.type(input, '{enter}');

    userEvent.type(input, 'Bob');  
    expect(input).toHaveValue('Bob');

    userEvent.click(screen.getByRole('button', { name: 'Clear' }));

    expect(screen.queryByText('Dayne')).not.toBeInTheDocument();
    expect(input).not.toHaveValue('Bob');
  });

  test('user can sort the list ascending', () => {
    render(<SortPage />);

    expect(screen.getByText('Sorted List')).toBeInTheDocument();

    const input = screen.getByRole('textbox', { name: 'list-item-input' });
    const items = ['Zayne', 'Amy'];

    items.forEach(item => {
      userEvent.type(input, item);
      userEvent.type(input, '{enter}');
    });

    const renderedItems = screen.getAllByTestId('item');
    renderedItems.forEach((itemNode, index) => {
      expect(itemNode.textContent).toBe(items[index])
    })

    userEvent.click(screen.getByRole('button', { name: '👆' }));

    const sortedItems = ['Amy', 'Zayne'];
    const sortedRenderedItems = screen.getAllByTestId('item');
    sortedRenderedItems.forEach((itemNode, index) => {
      expect(itemNode.textContent).toBe(sortedItems[index])
    });
  });

  test('user can sort the list descending', () => {
    render(<SortPage />);

    expect(screen.getByText('Sorted List')).toBeInTheDocument();

    const input = screen.getByRole('textbox', { name: 'list-item-input' });
    const items = ['Bob', 'Zayne', 'Ann'];

    items.forEach(item => {
      userEvent.type(input, item);
      userEvent.type(input, '{enter}');
    });

    const renderedItems = screen.getAllByTestId('item');
    renderedItems.forEach((itemNode, index) => {
      expect(itemNode.textContent).toBe(items[index])
    })

    userEvent.click(screen.getByRole('button', { name: '👆' }));
    userEvent.click(screen.getByRole('button', { name: '👇' }));

    const sortedItems = ['Zayne', 'Bob', 'Ann'];
    const sortedRenderedItems = screen.getAllByTestId('item');
    sortedRenderedItems.forEach((itemNode, index) => {
      expect(itemNode.textContent).toBe(sortedItems[index])
    });
  });
});