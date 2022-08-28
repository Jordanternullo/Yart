import Box from '@material-ui/core/Box';
import { default as CardMUI } from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import { Info, InfoSubtitle, InfoTitle } from '@mui-treasury/components/info';
import { useGalaxyInfoStyles } from '@mui-treasury/styles/info/galaxy';
import { useState } from 'react';
import Avatar from '../avatar/avatar';
import Icon from '../icon/icon';

/* eslint-disable-next-line */

export interface CardProps {
    post: {
        title: string;
        user?: {
            name: string;
            avatar: string;
        };
        likes?: {
            count: number;
            active: boolean;
        };
        comments?: {
            count: number;
            active: boolean;
        };
    };
    onClickLike?: (event: React.MouseEvent) => void;
    onClickComment?: (event: React.MouseEvent) => void;
    onClick?: (event: React.MouseEvent) => void;
    className?: string;
    showInfo?: boolean;
}

export function Card(props: CardProps) {
    const { post, className, showInfo = false } = props;
    const [isLike, setIsLike] = useState<boolean>(
        post.likes ? post.likes.active : false
    );

    const stateLikeButtonClassName = isLike ? 'text-primary-500' : '';
    const stateCommentsButtonClassName = post.comments?.active
        ? 'text-primary-500'
        : '';

    const onClickComment = (event: React.MouseEvent) => {
        props.onClickComment && props.onClickComment(event);
    };
    const onClickLike = (event: React.MouseEvent) => {
        setIsLike(!isLike);
        props.onClickLike && props.onClickLike(event);
    };

    const onClickHandler = (event: React.MouseEvent) => {
        props.onClick && props.onClick(event);
    };

    return (
        <CardMUI
            className={`group !rounded-none !shadow-none relative min-w-[200px] min-h-[360px] !bg-transparent hover:after:content-[''] hover:after:block hover:after:absolute hover:after:w-full hover:after:h-[100%] hover:after:bottom-0 hover:after:z-[1] hover:after:bg-gradient-to-t hover:after:from-black hover:cursor-pointer ${className} ${
                showInfo
                    ? "after:content-[''] after:block after:absolute after:w-full after:h-[100%] after:bottom-0 after:z-[1] after:bg-gradient-to-t after:from-black"
                    : ''
            }`}
            onClick={onClickHandler}
            data-testid="card">
            <CardMedia
                className={`top-0 left-0 w-full h-full absolute !bg-[center_top] ${
                    showInfo
                        ? 'group-hover:scale-110 transition ease-in-out delay-150'
                        : ''
                }`}
                image={
                    'https://image-us.samsung.com/SamsungUS/home/audio/galaxy-buds/MB-04-JustWhatYouWantV4.jpg?$cm-g-fb-full-bleed-img-mobile-jpg$'
                }
            />
            <Box
                py={3}
                px={2}
                className={`absolute z-[2] p-1 bottom-0 w-full ${
                    showInfo ? '' : 'hidden group-hover:block'
                }`}>
                <Info useStyles={useGalaxyInfoStyles}>
                    <div className={`flex justify-between`}>
                        <div className={`items-end space-y-4`}>
                            <InfoTitle
                                className={`!font-title !text-2xl !text-white`}>
                                {post.title}
                            </InfoTitle>
                            {post.user && (
                                <InfoSubtitle
                                    className={`!font-light !text-base flex items-center`}>
                                    <Avatar
                                        image={post.user.avatar}
                                        size="52"
                                    />
                                    <span className={`ml-4 !text-white`}>
                                        {post.user.name}
                                    </span>
                                </InfoSubtitle>
                            )}
                        </div>
                        {post.comments && post.likes && (
                            <div
                                className={`flex flex-col justify-end space-y-1 sm:flex-row text-white sm:space-x-4 items-end`}>
                                <div
                                    className={`flex items-center space-x-1 hover:cursor-pointer`}
                                    onClick={onClickComment}
                                    data-testid="comment-button">
                                    <span className={`text-base`}>
                                        {post.comments.count}
                                    </span>
                                    <Icon
                                        name={
                                            post.comments.active
                                                ? 'chat-3-fill'
                                                : 'chat-3-line'
                                        }
                                        className={`text-2xl ${stateCommentsButtonClassName}`}
                                        testId="comment-icon"></Icon>
                                </div>
                                <div
                                    className={`flex items-center space-x-1 hover:cursor-pointer`}
                                    onClick={onClickLike}
                                    data-testid="like-button">
                                    <span className={`text-base`}>
                                        {post.likes.count}
                                    </span>
                                    <Icon
                                        name={
                                            isLike
                                                ? 'thumb-up-fill'
                                                : 'thumb-up-line'
                                        }
                                        className={`text-2xl ${stateLikeButtonClassName}`}
                                        testId="like-icon"></Icon>
                                </div>
                            </div>
                        )}
                    </div>
                </Info>
            </Box>
        </CardMUI>
    );
}

export default Card;
