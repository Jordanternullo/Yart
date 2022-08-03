import { render, screen } from '@testing-library/react';

import NavItem, { NavItemProps } from './nav-item';

describe('NavItem', () => {
    let props: NavItemProps;

    beforeEach(() => {
        props = {
            picto: 'home-4-line',
            label: 'Home',
            link: '/',
        };
    });
    it('should render successfully', () => {
        const { baseElement } = render(<NavItem {...props} />);
        expect(baseElement).toBeTruthy();
    });

    it('should render with collapsed', () => {
        props.collapsed = true;
        render(<NavItem {...props} />);
        const label = screen.getByTestId('label');
        expect(label).toBeTruthy();
    });

    it('should render with active', () => {
        props.active = true;
        render(<NavItem {...props} />);
        const link = screen.getByTestId('link');
        expect(link.classList.contains('bg-dark-200')).toBe(true);
    });

    it('should render with correct className', () => {
        props.className = 'test-class';
        render(<NavItem {...props} />);
        const link = screen.getByTestId('link');
        expect(link.classList.contains('test-class')).toBe(true);
    });

    it('should render with correct classNamePicto', () => {
        props.classNamePicto = 'test-class';
        render(<NavItem {...props} />);
        const picto = screen.getByTestId('picto');
        expect(picto.classList.contains('test-class')).toBe(true);
    });

    it('should render with correct classNameLabel', () => {
        props.classNameLabel = 'test-class';
        props.collapsed = true;
        render(<NavItem {...props} />);
        const label = screen.getByTestId('label');
        expect(label.classList.contains('test-class')).toBe(true);
    });
});
