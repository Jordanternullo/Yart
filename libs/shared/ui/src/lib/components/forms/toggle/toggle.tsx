import { Switch } from '@headlessui/react';
import { useState } from 'react';

/* eslint-disable-next-line */
export interface ToggleProps {
  enabled?: boolean;
  onChange?: (state: boolean) => void;
}

export function Toggle(props: ToggleProps) {
  const { enabled = false, onChange } = props;
  const [state, setState] = useState(enabled);

  const onChangeHandle = () => {
    setState(!state);
    if (onChange) {
      onChange(state);
    }
  };

  return (
    <Switch
      checked={state}
      onChange={onChangeHandle}
      data-testid="btn-toggle"
      className={`${
        state ? 'bg-primary-400' : 'bg-transparent'
      } relative inline-flex h-6 w-11 items-center rounded-full border-primary-400 border`}
    >
      <span
        className={`${
          state ? 'translate-x-6' : 'translate-x-1'
        } inline-block h-4 w-4 rounded-full bg-white transform transition ease-in-out duration-200`}
      />
    </Switch>
  );
}

export default Toggle;
