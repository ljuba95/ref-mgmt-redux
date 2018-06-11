import * as React from 'react';
import { connect } from 'react-redux';
import StateType from '../../models/ReduxStateType';
import { deletePublication, getPublications } from '../../actions/Publications';
import { OrderedMap } from 'immutable';
import { Publication } from '../../models/Publication';
import { Dispatch } from 'redux';
import { Container, Dimmer, Loader, Button, Divider, Input, Grid, Icon, Header } from 'semantic-ui-react';
import PublicationsList from '../stateless/PublicationList';
import { Link } from 'react-router-dom';

export interface StateProps {
    publications: OrderedMap<string, Publication>;
}

export interface DispatchProps {
    getAuthors: () => Promise<any>;
    deletePublication: (id: string) => Promise<any>;
}

const initialState = {
    loaded: false,
    displayedPublications: OrderedMap()
};

export type State = typeof initialState;

const LoaderExampleLoader = () => (

    <Dimmer active inverted>
        <Loader>Loading..</Loader>
    </Dimmer>

);

class PublicationsPage extends React.Component<StateProps & DispatchProps, State> {

    state = {
        loaded: false,
        displayedPublications: this.props.publications
    };

    componentDidMount() {
        if (this.props.publications.size === 0) {
            this.props.getAuthors().then(() => this.setState(() => ({
                displayedPublications: this.props.publications,
                loaded: true
            })));
        } else {
            this.setState(() => ({loaded: true}));
        }

    }

    componentWillReceiveProps(nextProps: any) {
        this.setState({
            displayedPublications: nextProps.publications
        });
    }

    onQueryChange = (evt) => {
        let newDisplayed = this.props.publications.filter(
            (pub: Publication) => pub.get('title').toLowerCase().indexOf(evt.target.value.toLowerCase()) !== -1
        );
        this.setState({
            displayedPublications: OrderedMap(newDisplayed)
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
                            <Button icon as={Link} to={'/addPublication'}
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
                        <PublicationsList publications={{map: this.state.displayedPublications}}
                                          deletePublication={this.props.deletePublication}
                        /> : <LoaderExampleLoader/>}

                </Container>
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps: StateProps): StateProps => {
    return {publications: state.get('publications')};
};

const mapDispatchToProps = (dispatch: Dispatch<StateType>, ownProps: StateProps) =>
    ({
        getAuthors: (): Promise<any> => dispatch(getPublications()),
        deletePublication: (id: string): Promise<any> => dispatch(deletePublication(id))
    });

export default connect(mapStateToProps, mapDispatchToProps)(PublicationsPage);