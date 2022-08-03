import Link from 'next/link';
import Avatar from '../../avatar/avatar';
import Icon from '../../icon/icon';

/* eslint-disable-next-line */
export interface NavItemProps {
    picto?: string;
    label: string;
    link: string;
    className?: string;
    collapsed?: boolean;
    classNamePicto?: string;
    classNameLabel?: string;
    active?: boolean;
    avatar?: string;
}

export function NavItem(props: NavItemProps) {
    const {
        picto,
        label,
        link,
        className,
        collapsed,
        classNamePicto,
        classNameLabel,
        active,
        avatar,
    } = props;
    const defineClassName = `flex py-3 px-6 w-max items-center hover:bg-dark-200 hover:text-primary-500 ${className} ${
        active ? 'bg-primary-500 text-white' : ''
    }`;
    return (
        <Link href={link || '/'} passHref>
            <a className={defineClassName} data-testid="link">
                {avatar ? (
                    <Avatar
                        image={avatar || ''}
                        className={`${classNamePicto}`}
                    />
                ) : (
                    <Icon
                        testId="picto"
                        name={picto}
                        className={`text-2xl ${classNamePicto}`}
                    />
                )}
                {collapsed && (
                    <span
                        data-testid="label"
                        className={`ml-4 ${classNameLabel}`}>
                        {label}
                    </span>
                )}
            </a>
        </Link>
    );
}

export default NavItem;
