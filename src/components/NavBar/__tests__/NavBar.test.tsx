import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter as Router } from 'react-router-dom'; // Import BrowserRouter
import NavBar from '../index';

describe('NavBar Component', () => {
    test('renders correctly with company name and navigation links', () => {
        render(
            <Router>
                <NavBar />
            </Router>
        );

        expect(screen.getByText('S Corporation')).toBeInTheDocument();
        expect(screen.getByRole('link', { name: /Home/i })).toBeInTheDocument();
        expect(screen.getByRole('link', { name: /Subscribe/i })).toBeInTheDocument();
        expect(screen.getByRole('img', { name: /Company Logo/i })).toBeInTheDocument();
    });
});
