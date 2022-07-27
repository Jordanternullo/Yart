import { render, screen } from '@testing-library/react';

import Toggle, { ToggleProps } from './toggle';

describe('Toggle', () => {
  let props: ToggleProps;

  beforeEach(() => {
    props = {};
  });
  it('should render successfully', () => {
    const { baseElement } = render(<Toggle {...props} />);
    const toggle = screen.getByTestId('btn-toggle');
    expect(baseElement).toBeTruthy();
    expect(toggle.classList.contains('bg-transparent')).toBe(true);
  });

  it('should render with enabled', () => {
    props.enabled = true;
    const { baseElement } = render(<Toggle {...props} />);
    const toggle = screen.getByTestId('btn-toggle');
    expect(baseElement).toBeTruthy();
    expect(toggle.classList.contains('bg-primary-400')).toBe(true);
  });

  it('should tragger onChange', () => {
    props.onChange = jest.fn();
    const { baseElement } = render(<Toggle {...props} />);
    const toggle = screen.getByTestId('btn-toggle');
    expect(baseElement).toBeTruthy();
    toggle.click();
    expect(props.onChange).toHaveBeenCalled();
  });
});
