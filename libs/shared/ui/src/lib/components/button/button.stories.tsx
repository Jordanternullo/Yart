import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Button, ButtonColor } from './button';

export default {
  component: Button,
  title: 'Button',
} as ComponentMeta<typeof Button>;

const Template: ComponentStory<typeof Button> = (args) => <Button {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  children: 'Button',
  disabled: false,
  iconLeft: 'building-2-line',
  iconRight: 'arrow-right-s-line',
  color: ButtonColor.Primary,
};

export const Dark = Template.bind({});
Dark.args = {
  children: 'Button',
  disabled: false,
  iconLeft: 'building-2-line',
  iconRight: 'arrow-right-s-line',
  color: ButtonColor.Dark,
};

export const Icon = Template.bind({});
Icon.args = {
  children: 'Button',
  disabled: false,
  buttonIcon: 'building-2-line',
  color: ButtonColor.Primary,
};
