import * as React from 'react';
import {  Menu } from 'semantic-ui-react';
import { NavLink } from 'react-router-dom';

const Nav = props => (
    <NavLink
        exact
        {...props}
        activeClassName="active"
    />
);
export interface Props {

}
const NavMenu: React.SFC<Props> = (props: Props): JSX.Element => (
                <Menu>
                    <Menu.Item
                        name="Home"
                        as={Nav}
                        to="/"
                    />
                    <Menu.Item
                        name="Publications"
                        as={Nav}
                        to="/publications"
                    />
                    <Menu.Item
                        name="Item 2 "
                        as={Nav}
                        to="/item2"
                    />
                    <Menu.Item
                        name="Item 3 "
                        as={Nav}
                        to="/item3"
                    />
                </Menu>
    );

export default NavMenu;