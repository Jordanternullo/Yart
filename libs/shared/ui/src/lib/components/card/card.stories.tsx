import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Card } from './card';

export default {
    component: Card,
    title: 'Card',
} as ComponentMeta<typeof Card>;

const Template: ComponentStory<typeof Card> = (args) => <Card {...args} />;

export const Primary = Template.bind({});
Primary.args = {
    post: {
        title: 'Title Post',
        user: {
            name: 'Pseudo user',
            avatar: 'https://image-us.samsung.com/SamsungUS/home/audio/galaxy-buds/MB-04-JustWhatYouWantV4.jpg?$cm-g-fb-full-bleed-img-mobile-jpg$',
        },
        comments: {
            count: 0,
            active: false,
        },
        likes: {
            count: 0,
            active: true,
        },
    },
};
