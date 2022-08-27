import { ComponentStory, ComponentMeta } from '@storybook/react';
import Button from '../button/button';
import { Dialog } from './dialog';

export default {
    component: Dialog,
    title: 'Dialog',
} as ComponentMeta<typeof Dialog>;

const Template: ComponentStory<typeof Dialog> = (args) => <Dialog {...args} />;

export const Primary = Template.bind({});
Primary.args = {
    trigger: <Button>Trigger dialog</Button>,
    title: 'Dialog title',
    children: <p>Dialog content !</p>,
};
