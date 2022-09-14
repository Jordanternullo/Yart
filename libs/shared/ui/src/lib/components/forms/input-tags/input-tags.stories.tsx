import { ComponentStory, ComponentMeta } from '@storybook/react';
import { InputTags } from './input-tags';

export default {
    component: InputTags,
    title: 'Forms/InputTags',
} as ComponentMeta<typeof InputTags>;

const Template: ComponentStory<typeof InputTags> = (args) => (
    <InputTags {...args} />
);

export const Primary = Template.bind({});
Primary.args = {
    tags: [{id : 'tags 1'}],
};
