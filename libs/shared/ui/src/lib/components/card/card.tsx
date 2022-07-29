import Box from '@material-ui/core/Box';
import * as CardMUI from '@material-ui/core/Card';
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
        author: {
            name: string;
            avatar: string;
        };
        likes: {
            count: number;
            active: boolean;
        };
        comments: {
            count: number;
            active: boolean;
        };
    };
    onClickLike?: (event: React.MouseEvent) => void;
    onClickComment?: (event: React.MouseEvent) => void;
    onClick?: (event: React.MouseEvent) => void;
    className?: string;
}

export function Card(props: CardProps) {
    const { post, className } = props;
    const [isLike, setIsLike] = useState<boolean>(post.likes.active);

    const stateLikeButtonClassName = isLike ? 'text-primary-500' : '';
    const stateCommentsButtonClassName = post.comments.active
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
        <CardMUI.default
            className={`group !rounded-2xl !shadow-none relative min-w-[200px] min-h-[360px] !bg-transparent hover:after:content-[''] hover:after:block hover:after:absolute hover:after:w-full hover:after:h-[100%] hover:after:bottom-0 hover:after:z-[1] hover:after:bg-gradient-to-t hover:after:from-black hover:cursor-pointer ${className}`}
            onClick={onClickHandler}
            data-testid="card">
            <CardMedia
                className={
                    'top-0 left-0 w-full h-full absolute !bg-[center_top]'
                }
                image={
                    'https://image-us.samsung.com/SamsungUS/home/audio/galaxy-buds/MB-04-JustWhatYouWantV4.jpg?$cm-g-fb-full-bleed-img-mobile-jpg$'
                }
            />
            <Box
                py={3}
                px={2}
                className={`absolute z-[2] p-1 bottom-0 w-full hidden group-hover:block`}>
                <Info useStyles={useGalaxyInfoStyles}>
                    <div className={`flex justify-between`}>
                        <div className={`items-end space-y-4`}>
                            <InfoTitle className={`!font-title !text-2xl`}>
                                {post.title}
                            </InfoTitle>
                            <InfoSubtitle
                                className={`!font-light !text-base flex items-center`}>
                                <Avatar image={post.author.avatar} size="52" />
                                <span className={`ml-4`}>
                                    {post.author.name}
                                </span>
                            </InfoSubtitle>
                        </div>
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
                    </div>
                </Info>
            </Box>
        </CardMUI.default>
    );
}

export default Card;
