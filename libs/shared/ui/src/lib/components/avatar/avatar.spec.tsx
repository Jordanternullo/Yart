import { render, screen } from '@testing-library/react';

import Avatar, { AvatarProps } from './avatar';

describe('Avatar', () => {
    let props: AvatarProps;

    beforeEach(() => {
        props = {
            image: 'https://image-us.samsung.com/SamsungUS/home/audio/galaxy-buds/MB-04-JustWhatYouWantV4.jpg?$cm-g-fb-full-bleed-img-mobile-jpg$',
        };
    });
    it('should render successfully', () => {
        const { baseElement } = render(<Avatar {...props} />);
        expect(baseElement).toBeTruthy();
    });

    it('should render with image', () => {
        render(<Avatar {...props} />);
        const image = screen.getByRole('image');
        expect(image).toBeTruthy();
    });
});
