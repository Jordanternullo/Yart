import { render } from '@testing-library/react';

import Card, { CardProps } from './card';

describe('Card', () => {
    let props: CardProps;

    beforeEach(() => {
        props = {
            post: {
                title: 'Title Post',
                author: {
                    name: 'Pseudo author',
                    avatar: 'https://image-us.samsung.com/SamsungUS/home/audio/galaxy-buds/MB-04-JustWhatYouWantV4.jpg?$cm-g-fb-full-bleed-img-mobile-jpg$',
                },
                comments: {
                    count: 0,
                    active: false,
                },
                likes: {
                    count: 0,
                    active: false,
                },
            },
        };
    });
    it('should render successfully', () => {
        const { baseElement } = render(<Card {...props} />);
        expect(baseElement).toBeTruthy();
    });

    it('should trigger onClickLike', () => {
        const onClickLike = jest.fn();
        const { getByTestId } = render(
            <Card {...props} onClickLike={onClickLike} />
        );
        const button = getByTestId('like-button');
        button.click();
        expect(onClickLike).toHaveBeenCalled();
    });

    it('should trigger onClickComment', () => {
        const onClickComment = jest.fn();
        const { getByTestId } = render(
            <Card {...props} onClickComment={onClickComment} />
        );
        const button = getByTestId('comment-button');
        button.click();
        expect(onClickComment).toHaveBeenCalled();
    });

    it('should trigger onClick', () => {
        const onClick = jest.fn();
        const { getByTestId } = render(<Card {...props} onClick={onClick} />);
        const card = getByTestId('card');
        card.click();
        expect(onClick).toHaveBeenCalled();
    });

    it('should render with like active', () => {
        props.post.likes.active = true;
        const { getByTestId } = render(<Card {...props} />);
        const icon = getByTestId('like-icon');
        expect(icon.classList.contains('ri-thumb-up-fill')).toBe(true);
    });

    it('should render with comment active', () => {
        props.post.comments.active = true;
        const { getByTestId } = render(<Card {...props} />);
        const icon = getByTestId('comment-icon');
        expect(icon.classList.contains('ri-chat-3-fill')).toBe(true);
    });
    it('should render with dislike active', () => {
        props.post.likes.active = false;
        const { getByTestId } = render(<Card {...props} />);
        const icon = getByTestId('like-icon');
        expect(icon.classList.contains('ri-thumb-up-line')).toBe(true);
    });

    it('should render with dislike active', () => {
        props.post.comments.active = false;
        const { getByTestId } = render(<Card {...props} />);
        const icon = getByTestId('comment-icon');
        expect(icon.classList.contains('ri-chat-3-line')).toBe(true);
    });
});
