/* eslint-disable-next-line */
export interface CheckboxProps extends React.ComponentPropsWithoutRef<'input'> {
    label?: string;
    labelClassName?: string;
}

export function Checkbox(props: CheckboxProps) {
    const { label, labelClassName } = props;

    const disabledClassName = props.disabled ? 'before:bg-dark-200' : '';
    return (
        <label className={'flex items-center gap-4'}>
            <input
                type="checkbox"
                className={`w-0 h-0 -mt-[17px] relative
              before:content-[''] before:absolute before:top-0 before:left-0 before:block before:w-4 before:h-4 before:border-2 before:border-dark-300 before:rounded-sm focus:before:border-primary-300 outline-none checked:before:border-primary-300
              checked:after:content[''] checked:after:block checked:after:w-2 checked:after:h-2 checked:after:bg-primary-300 checked:after:mt-1 checked:after:ml-1 ${disabledClassName}`}
                {...props}
            />
            {label && (
                <span
                    data-testid="checkbox-label"
                    className={`block nb-0 ml-1 text-sm ${labelClassName}`}>
                    {label}
                </span>
            )}
        </label>
    );
}

export default Checkbox;
