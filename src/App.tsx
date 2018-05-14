import * as React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import PublicationsPage from './components/statefull/PublicationsPage';
import { HomePage } from './components/statefull/HomePage';
import Page404 from './components/stateless/Page404';
import NavMenu from './components/stateless/NavMenu';
import AddPubForm from './components/statefull/AddPubForm';
import EditPubForm from './components/statefull/EditPubForm';
import { Container } from 'semantic-ui-react';
import AuthorsPage from './components/statefull/AuthorsPage';
import AddAuthorForm from './components/statefull/AddAuthorForm';
import EditAuthorForm from './components/statefull/EditAuthorForm';

// Root component
class App extends React.Component {
    render() {
        return (
            <BrowserRouter>

                <Container>
                    <Route component={NavMenu}></Route>
                    <Switch>
                        <Route exact={true} path={'/'} component={HomePage}/>
                        <Route exact={true} path={'/publications'} component={PublicationsPage}/>
                        <Route exact={true} path={'/addPublication'} component={AddPubForm}/>
                        <Route exact={true} path={'/editPublication/:id'} component={EditPubForm}/>
                        <Route exact={true} path={'/authors'} component={AuthorsPage}/>
                        <Route exact={true} path={'/addAuthor'} component={AddAuthorForm}/>
                        <Route exact={true} path={'/editAuthor/:id'} component={EditAuthorForm}/>

                        <Route component={Page404}></Route>
                    </Switch>
                </Container>

            </BrowserRouter>
        );
    }
}

export default App;
