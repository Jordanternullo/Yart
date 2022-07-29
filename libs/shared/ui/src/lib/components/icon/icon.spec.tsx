import { render, screen } from '@testing-library/react';

import Icon, { IconProps } from './icon';

describe('Icon', () => {
    let props: IconProps;

    beforeEach(() => {
        props = {
            name: 'home-4-line',
        };
    });

    it('should render successfully', () => {
        const { baseElement } = render(<Icon {...props} />);
        const icon = screen.getByRole('img');
        expect(baseElement).toBeTruthy();
        expect(icon.classList.contains('ri-home-4-line')).toBe(true);
    });

    it('should render with className', () => {
        props.className = 'test-class';
        const { baseElement } = render(<Icon {...props} />);
        const icon = screen.getByRole('img');
        expect(baseElement).toBeTruthy();
        expect(icon.classList.contains('ri-home-4-line')).toBe(true);
        expect(icon.classList.contains('test-class')).toBe(true);
    });
});
