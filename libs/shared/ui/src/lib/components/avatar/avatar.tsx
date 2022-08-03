import React from 'react';
import * as AvatarMUI from '@material-ui/core/Avatar';
import { useDynamicAvatarStyles } from '@mui-treasury/styles/avatar/dynamic';

/* eslint-disable-next-line */
export interface AvatarProps {
    image: string;
    size?: string;
    className?: string;
}

export function Avatar(props: AvatarProps) {
    const { image, size, className } = props;

    const avatarStyles = useDynamicAvatarStyles({ size: size || 56 });

    return (
        <AvatarMUI.default
            classes={avatarStyles}
            src={image}
            role="image"
            className={className}
        />
    );
}

export default Avatar;
