import { render, screen } from '@testing-library/react';

import Checkbox, { CheckboxProps } from './checkbox';

describe('Checkbox', () => {
    let props: CheckboxProps;

    beforeEach(() => {
        props = {};
    });
    it('should render successfully', () => {
        const { baseElement } = render(<Checkbox />);
        expect(baseElement).toBeTruthy();
    });
    it('should render successfully with label', () => {
        props.label = 'test';
        render(<Checkbox {...props} />);
        const label = screen.getByTestId('checkbox-label');
        expect(label).toBeTruthy();
    });

    it('should render successfully with labelClassName', () => {
        props.label = 'test';
        props.labelClassName = 'test';
        render(<Checkbox {...props} />);
        const label = screen.getByTestId('checkbox-label');
        expect(label.classList.contains('test')).toBe(true);
    });

    it('should render successfully with disabled', () => {
        props.disabled = true;
        render(<Checkbox {...props} />);
        const input = screen.getByRole('checkbox');
        expect(input.classList.contains('before:bg-dark-200')).toBe(true);
    });

    it('should render successfully with checked', () => {
        props.checked = true;
        render(<Checkbox {...props} />);
        const input = screen.getByRole('checkbox');
        expect(
            input.classList.contains('checked:before:border-primary-300')
        ).toBe(true);
    });

    it('should render successfully with onChange', () => {
        props.onChange = jest.fn();
        render(<Checkbox {...props} />);
        const input = screen.getByRole('checkbox');
        input.click();
        expect(props.onChange).toHaveBeenCalled();
    });

    it('should render successfully with className', () => {
        props.className = 'test';
        render(<Checkbox {...props} />);
        const input = screen.getByRole('checkbox');
        expect(input.classList.contains('test')).toBe(true);
    });
});
