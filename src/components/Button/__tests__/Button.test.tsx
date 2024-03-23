import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Button from '../index';

describe('Button Component', () => {
    test('renders with text and responds to click events', () => {
        const handleClick = jest.fn();
        render(<Button onClick={handleClick}>Click Me!</Button>);

        const buttonElement = screen.getByRole('button', { name: 'Click Me!' });
        expect(buttonElement).toBeInTheDocument();

        fireEvent.click(buttonElement);
        expect(handleClick).toHaveBeenCalledTimes(1);
    });
});
