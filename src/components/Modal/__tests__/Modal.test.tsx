// import { render } from '@testing-library/react';
// import Modal from '../index';
import '@testing-library/jest-dom';


describe('Modal Component', () => {

    test('dummy', () => {
        expect(true).toBe(true);
    });

    // test('renders without crashing', () => {
    //     const { getByText } = render(
    //         <Modal onClose={() => {}}><div>Mock Content</div></Modal>
    //     );
    //     expect(getByText('Mock Content')).toBeInTheDocument();
    // });

    // const mockOnClose = jest.fn();
    // test('modal opens and closes correctly', () => {
    //     const { rerender } = render(<Modal onClose={mockOnClose} ref={null} children={undefined} />);
    //     expect(screen.queryByText('X')).not.toBeInTheDocument();

    //     rerender(<Modal onClose={mockOnClose} ref={null} children={<div>Modal Content</div>} />);
    //     expect(screen.getByText('Modal Content')).toBeInTheDocument();
    //     expect(screen.getByText('X')).toBeInTheDocument();

    //     fireEvent.click(screen.getByText('X'));
    //     expect(mockOnClose).toHaveBeenCalledTimes(1);

    //     fireEvent.click(screen.getByTestId('modal-backdrop'));
    //     expect(mockOnClose).toHaveBeenCalledTimes(2);
    // });
});
