import * as React from 'react';
import { Route, NavLink } from 'react-router-dom';
import { Container, Menu } from 'semantic-ui-react';
import { StatelessComponent } from './components/StatelessComponent';

const Nav = props => (
    <NavLink
        exact
        {...props}
        activeClassName="active"
    />
);
// Root component
class App extends React.Component {
    render() {
        return (
            <Container>
                <Menu>
                    <Menu.Item
                        name="Home"
                        as={Nav}
                        to="/"
                    />
                </Menu>
                <Route exact={true} path={'/'} component={StatelessComponent}/>

            </Container>
        );
    }
}

export default App;
