import { render, screen } from '@testing-library/react';

import Input, { InputProps, InputState } from './input';

describe('Input', () => {
    let props: InputProps;

    beforeEach(() => {
        props = {};
    });
    it('should render successfully', () => {
        const { baseElement } = render(<Input {...props} />);
        expect(baseElement).toBeTruthy();
    });
    it('should render successfully with label', () => {
        props.label = 'test';
        render(<Input {...props} />);
        const label = screen.getByTestId('label');
        expect(label).toBeTruthy();
    });

    it('should render successfully with labelClassName', () => {
        props.label = 'test';
        props.labelClassName = 'test';
        render(<Input {...props} />);
        const label = screen.getByTestId('label');
        expect(label.classList.contains('test')).toBe(true);
    });

    it('should render successfully with disabled', () => {
        props.disabled = true;
        render(<Input {...props} />);
        const input = screen.getByTestId('input');
        expect(input.classList.contains('!bg-dark-200')).toBe(true);
    });

    it('should render successfully with className', () => {
        props.className = 'test';
        render(<Input {...props} />);
        const input = screen.getByTestId('input');
        expect(input.classList.contains('test')).toBeTruthy();
    });

    it('should render successfully with label className', () => {
        props.label = 'test';
        props.labelClassName = 'test';
        render(<Input {...props} />);
        const label = screen.getByTestId('label');
        expect(label.classList.contains('test')).toBe(true);
    });

    it('should render the input with the errorMessage', () => {
        props.errorMessage = 'errorMessage';
        render(<Input {...props} />);
        const errorMessage = screen.getByTestId('input-errormessage');
        expect(errorMessage.textContent).toBe('errorMessage');
    });

    it('should render the input with the state', () => {
        props.state = InputState.Error;
        render(<Input {...props} />);
        const input = screen.getByTestId('input');
        expect(input.classList.contains('!border-error-500')).toBeTruthy();
    });
});
