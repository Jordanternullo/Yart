/* eslint-disable-next-line */
export interface IconProps {
  name: string;
  className?: string;
}

export function Icon(props: IconProps) {
  const { name, className = '' } = props;
  return <i className={`ri-${name} ${className}`} role="img"></i>;
}

export default Icon;
