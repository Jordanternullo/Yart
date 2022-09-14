import { ComponentStory, ComponentMeta } from '@storybook/react';
import { TextEditor } from './text-editor';

export default {
    component: TextEditor,
    title: 'Forms/TextEditor',
} as ComponentMeta<typeof TextEditor>;

const Template: ComponentStory<typeof TextEditor> = (args) => (
    <TextEditor {...args} />
);

export const Primary = Template.bind({});
Primary.args = {};
