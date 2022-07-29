import { ComponentStory, ComponentMeta } from '@storybook/react';
import Toggle from './toggle';

export default {
  component: Toggle,
  title: 'Forms/Toogle',
} as ComponentMeta<typeof Toggle>;

const Template: ComponentStory<typeof Toggle> = (args) => <Toggle {...args} />;

export const Normal = Template.bind({});
Normal.args = {
  enabled: true,
};
