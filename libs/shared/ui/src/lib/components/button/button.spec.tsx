import { render, screen } from '@testing-library/react';

import Button, { ButtonColor, ButtonProps, ButtonSize } from './button';

describe('Button', () => {
  let props: ButtonProps;

  beforeEach(() => {
    props = {};
  });

  it('should render successfully', () => {
    const { baseElement } = render(<Button {...props} />);
    expect(baseElement).toBeTruthy();
  });
  it('should render with correct className', () => {
    props.className = 'test-class';
    render(<Button {...props} />);
    const button = screen.getByRole('button');
    expect(button.classList.contains('test-class')).toBe(true);
  });

  it('should render with correct color', () => {
    props.color = ButtonColor.Dark;
    render(<Button {...props} />);
    const button = screen.getByRole('button');
    expect(button.classList.contains('bg-dark-400')).toBe(true);
  });

  it('should render with correct size', () => {
    props.size = ButtonSize.Big;
    render(<Button {...props} />);
    const button = screen.getByRole('button');
    expect(button.classList.contains('h-14')).toBe(true);
  });

  it('shoud render with disabled', () => {
    props.disabled = true;
    render(<Button {...props} />);
    const button = screen.getByRole('button');
    expect(button.classList.contains('bg-light-100')).toBe(true);
  });

  it('should render with iconLeft', () => {
    props.iconLeft = 'home-4-line';
    render(<Button {...props} />);
    const icon = screen.getByTestId('btn-iconleft');
    expect(icon.classList.contains('ri-home-4-line')).toBe(true);
  });

  it('should render with buttonIcon', () => {
    props.buttonIcon = 'home-4-line';
    render(<Button {...props} />);
    const icon = screen.getByTestId('btn-icon');
    expect(icon?.classList.contains('ri-home-4-line')).toBe(true);
  });

  it('should render with iconRight', () => {
    props.iconRight = 'home-4-line';
    render(<Button {...props} />);
    const icon = screen.getByTestId('btn-iconright');
    expect(icon?.classList.contains('ri-home-4-line')).toBe(true);
  });

  it('should render with external link', () => {
    props.link = 'https://google.com';
    props.external = true;
    render(<Button {...props} />);
    const link = screen.getByTestId('btn-externallink');
    expect(link).toBeTruthy();
  });

  it('should render with link', () => {
    props.link = '/test';
    render(<Button {...props} />);
    const link = screen.getByTestId('btn-internallink');
    expect(link).toBeTruthy();
  });

  it('should trigger a function onClick', () => {
    const onClick = jest.fn();
    props.onClick = onClick;
    render(<Button {...props} />);
    const button = screen.getByRole('button');
    button.click();
    expect(onClick).toHaveBeenCalled();
  });
});
