import { render, screen } from '@testing-library/react';

import Radio, { RadioProps } from './radio';

describe('Radio', () => {
    let props: RadioProps;

    beforeEach(() => {
        props = {};
    });
    it('should render successfully', () => {
        const { baseElement } = render(<Radio />);
        expect(baseElement).toBeTruthy();
    });
    it('should render successfully with label', () => {
        props.label = 'test';
        render(<Radio {...props} />);
        const label = screen.getByTestId('radio-label');
        expect(label).toBeTruthy();
    });

    it('should render successfully with labelClassName', () => {
        props.label = 'test';
        props.labelClassName = 'test';
        render(<Radio {...props} />);
        const label = screen.getByTestId('radio-label');
        expect(label.classList.contains('test')).toBe(true);
    });

    it('should render successfully with disabled', () => {
        props.disabled = true;
        render(<Radio {...props} />);
        const input = screen.getByRole('radio');
        expect(input.classList.contains('before:bg-dark-200')).toBe(true);
    });

    it('should render successfully with checked', () => {
        props.checked = true;
        render(<Radio {...props} />);
        const input = screen.getByRole('radio');
        expect(
            input.classList.contains('checked:before:border-primary-300')
        ).toBe(true);
    });

    it('should render successfully with onChange', () => {
        props.onChange = jest.fn();
        render(<Radio {...props} />);
        const input = screen.getByRole('radio');
        input.click();
        expect(props.onChange).toHaveBeenCalled();
    });

    it('should render successfully with className', () => {
        props.className = 'test';
        render(<Radio {...props} />);
        const input = screen.getByRole('radio');
        expect(input.classList.contains('test')).toBe(true);
    });
});
