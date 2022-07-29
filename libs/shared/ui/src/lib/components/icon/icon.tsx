/* eslint-disable-next-line */
export interface IconProps {
    name: string;
    className?: string;
    testId?: string;
}

export function Icon(props: IconProps) {
    const { name, className = '', testId } = props;
    return (
        <i
            className={`ri-${name} ${className}`}
            data-testid={testId}
            role="img"></i>
    );
}

export default Icon;
