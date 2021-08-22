import { screen, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SortPage from '../components/SortPage';
import { sortList } from '../utils/sortHelpers';

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

  test('user can sort the list descending', () => {
    render(<SortPage />);

    expect(screen.getByText('Sorted List')).toBeInTheDocument();

    const input = screen.getByRole('textbox', { name: 'list-item-input' });
    const items = ['Zayne', 'Amy'];

    items.forEach(item => {
      userEvent.type(input, item);
      userEvent.type(input, '{enter}');
    });

    const ascendingItems = ['Amy', 'Zayne'];
    const renderedItems = screen.getAllByTestId('item');
    renderedItems.forEach((itemNode, index) => {
      expect(itemNode.textContent).toBe(ascendingItems[index])
    })

    userEvent.click(screen.getByLabelText('point-down'));

    const descendingItems = ['Zayne', 'Amy'];
    const sortedRenderedItems = screen.getAllByTestId('item');
    sortedRenderedItems.forEach((itemNode, index) => {
      expect(itemNode.textContent).toBe(descendingItems[index])
    });
  });

  test('user can sort the list ascending', () => {
    render(<SortPage />);

    expect(screen.getByText('Sorted List')).toBeInTheDocument();

    const input = screen.getByRole('textbox', { name: 'list-item-input' });

    const items = ['Bob', 'Zayne', 'Ann'];
    items.forEach(item => {
      userEvent.type(input, item);
      userEvent.type(input, '{enter}');
    });
  

    const ascendingItems = ['Ann', 'Bob', 'Zayne'];
    const renderedItems = screen.getAllByTestId('item');

    renderedItems.forEach((itemNode, index) => {
      expect(itemNode.textContent).toBe(ascendingItems[index])
    })

    userEvent.click(screen.getByLabelText('point-down'));
    userEvent.click(screen.getByLabelText('point-up'));

    const sortedItems = ['Ann', 'Bob', 'Zayne'];
    const sortedRenderedItems = screen.getAllByTestId('item');
    sortedRenderedItems.forEach((itemNode, index) => {
      expect(itemNode.textContent).toBe(sortedItems[index])
    });
  });
});