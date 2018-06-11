import * as React from 'react';
import { connect } from 'react-redux';
import StateType from '../../models/ReduxStateType';
import { Map } from 'immutable';
import { Dispatch } from 'redux';
import { Container, Dimmer, Loader, Button, Divider, Input, Grid, Icon, Header } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { Author } from '../../models/Author';
import { deleteAuthor, getAuthors } from '../../actions/Authors';
import AuthorList from '../stateless/AuthorList';
import { RouteComponentProps } from 'react-router';

export interface StateProps {
    authors: Map<string, Author>;
}

export interface DispatchProps {
    getAuthors: () => Promise<any>;
    deleteAuthor: (id: string) => Promise<any>;
}

const initialState = {
    loaded: false,
    displayedAuthors: Map()
};

export type State = typeof initialState;

const MyLoader = () => (
        <Dimmer active inverted>
            <Loader>Loading...</Loader>
        </Dimmer>
);

class AuthorsPage extends React.Component<StateProps & DispatchProps & RouteComponentProps<void>, State> {

    state = {
        loaded: false,
        displayedAuthors: this.props.authors
    };

    componentDidMount() {
        if (this.props.authors.size === 0) {
            this.props.getAuthors().then(() => this.setState(() => ({
                displayedAuthors: this.props.authors,
                loaded: true
            })));
        } else {
            this.setState(() => ({loaded: true}));
        }
    }

    componentWillReceiveProps(nextProps: any) {
        this.setState({
            displayedAuthors: nextProps.authors
        });
    }

    onQueryChange = (evt) => {
        let newDisplayed = this.props.authors.filter(
            (author: Author) =>
                (author.get('name').toLowerCase().indexOf(evt.target.value.toLowerCase()) !== -1) ||
                (author.get('familyName').toLowerCase().indexOf(evt.target.value.toLowerCase()) !== -1)
        );
        this.setState({
            displayedAuthors: Map(newDisplayed)
        });
    }

    render() {

        return (
            <div>
                <Container>
                    <Header size={'huge'} textAlign={'center'}>
                        Manage publications
                    </Header>
                    <Grid columns={'equal'}>
                        <Grid.Column floated={'left'} computer={5} mobile={9}>
                            <Button icon as={Link} to={'/addAuthor'}
                                    labelPosition={'left'} primary fluid>
                                <Icon name={'newspaper'}/> Add Publication
                            </Button>
                        </Grid.Column>
                        <Grid.Column floated={'right'} computer={5} mobile={7}>
                            <Input icon={'search'} placeholder={'Search...'} onChange={this.onQueryChange} fluid/>
                        </Grid.Column>
                    </Grid>
                    <Divider></Divider>

                    {this.state.loaded ?
                        <AuthorList history={this.props.history} authors={{map: this.state.displayedAuthors}}
                                          deleteAuthor={this.props.deleteAuthor}
                        /> : <MyLoader/>}

                </Container>
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps: StateProps): StateProps => {
    return {authors: state.get('authors')};
};

const mapDispatchToProps = (dispatch: Dispatch<StateType>, ownProps: StateProps) =>
    ({
        getAuthors: (): Promise<any> => dispatch(getAuthors()),
        deleteAuthor: (id: string): Promise<any> => dispatch(deleteAuthor(id))
    });

export default connect(mapStateToProps, mapDispatchToProps)(AuthorsPage);