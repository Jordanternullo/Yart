import { useState } from 'react';
import { WithContext as ReactTags } from 'react-tag-input';

/* eslint-disable-next-line */
export enum InputTagsState {
    Normal = 'normal',
    Error = 'error',
    Success = 'success',
}

export interface InputTagsProps extends React.ComponentPropsWithoutRef<'input'> {
    label?: string;
    className?: string;
    labelClassName?: string;
    containerClassName?: string;
    state?: InputTagsState;
    errorMessage?: string;
    onChange?: (event: React.ChangeEvent) => void;
}

export function InputTags(props: InputTagsProps) {
    const {
        label,
        labelClassName = '',
        className = '',
        containerClassName = '',
        state = InputTagsState.Normal,
        errorMessage,
        onChange,
        ...inputProps
    } = props;

    const [value, setValue] = useState<string>('');

    const stateClassName = {
        [InputTagsState.Normal]: '',
        [InputTagsState.Error]: '!border-error-500',
        [InputTagsState.Success]: '!border-success-500',
    };
    const haveValueClassName =
        value.length > 0 && state === InputTagsState.Normal
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
            <ReactTags
          inputFieldPosition="bottom"
          autocomplete
        />
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

export default InputTags;
