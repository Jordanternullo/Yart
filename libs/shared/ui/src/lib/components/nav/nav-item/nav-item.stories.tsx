import { ComponentStory, ComponentMeta } from '@storybook/react';
import { NavItem } from './nav-item';

export default {
    component: NavItem,
    title: 'Navbar/NavItem',
} as ComponentMeta<typeof NavItem>;

const Template: ComponentStory<typeof NavItem> = (args) => (
    <NavItem {...args} />
);

export const Primary = Template.bind({});
Primary.args = {
    picto: 'home-4-line',
    label: 'Home',
};
