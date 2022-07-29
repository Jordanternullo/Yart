import { useState } from 'react';

/* eslint-disable-next-line */
export enum InputState {
    Normal = 'normal',
    Error = 'error',
    Success = 'success',
}

export interface InputProps extends React.ComponentPropsWithoutRef<'input'> {
    label?: string;
    className?: string;
    labelClassName?: string;
    containerClassName?: string;
    state?: InputState;
    errorMessage?: string;
    onChange?: (event: React.ChangeEvent) => void;
}

export function Input(props: InputProps) {
    const {
        label,
        labelClassName = '',
        className = '',
        containerClassName = '',
        state = InputState.Normal,
        errorMessage,
        onChange,
        ...inputProps
    } = props;

    const [value, setValue] = useState<string>('');

    const stateClassName = {
        [InputState.Normal]: '',
        [InputState.Error]: '!border-error-500',
        [InputState.Success]: '!border-success-500',
    };
    const haveValueClassName =
        value.length > 0 && state === InputState.Normal
            ? `!border-primary-300`
            : '';

    const disabledClassName = inputProps.disabled ? '!bg-dark-200' : '';

    const onChangeValue = (event: React.ChangeEvent) => {
        const { value } = event.target as HTMLInputElement;
        setValue(value);
        onChange && onChange(event);
    };
    return (
        <label className={containerClassName}>
            {label && (
                <span
                    data-testid="label"
                    className={`block nb-0 ml-1 text-sm ${labelClassName}`}>
                    {label}
                </span>
            )}
            <input
                className={`h-10 w-full border-2 border-dark-300 text-sm text-white bg-dark-400 rounded-md px-4 outline-none focus:border-primary-300 transition ${stateClassName[state]} ${haveValueClassName} ${disabledClassName} ${className}`}
                data-testid="input"
                onChange={onChangeValue}
                {...inputProps}
            />
            {errorMessage && (
                <span
                    className="text-xs text-error-500 mt-1.5"
                    data-testid="input-errormessage">
                    {errorMessage}
                </span>
            )}
        </label>
    );
}

export default Input;
