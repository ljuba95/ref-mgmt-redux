import * as React from 'react';
import { Route, NavLink } from 'react-router-dom';
import { Container, Menu } from 'semantic-ui-react';
import { default as PublicationsPage } from './components/PublicationsPage';

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
                        name="Publications"
                        as={Nav}
                        to="/"
                    />
                </Menu>
                <Route exact={true} path={'/'} component={PublicationsPage}/>

            </Container>
        );
    }
}

export default App;
