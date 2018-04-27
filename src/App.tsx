import * as React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import PublicationsPage  from './components/statefull/PublicationsPage';
import HomePage  from './components/statefull/HomePage';
import Page404 from './components/stateless/Page404';
import NavMenu from './components/stateless/NavMenu';
// Root component
class App extends React.Component {
    render() {
        return (
            <BrowserRouter>

                <div>
                    <Route component = {NavMenu}></Route>
                    <Switch>
                        <Route exact={true} path={'/'} component={HomePage}/>
                        <Route exact={true} path={'/publications'} component={PublicationsPage}/>
                        <Route component = {Page404}></Route>
                    </Switch>
                </div>
            </BrowserRouter>
        );
    }
}

export default App;
