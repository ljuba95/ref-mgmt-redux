import * as React from 'react';
import { connect } from 'react-redux';
import StateType from '../../models/ReduxStateType';
import { deletePublication, getPublications } from '../../actions/Publications';
import { OrderedMap } from 'immutable';
import { Publication } from '../../models/Publication';
import { Dispatch } from 'redux';
import { Container, Dimmer, Loader, Image, Segment, Button, Divider, Input, Grid } from 'semantic-ui-react';
import PublicationsList from '../stateless/PublicationList';
import { Link } from 'react-router-dom';

export interface StateProps {
    publications: OrderedMap<string, Publication>;
}

export interface DispatchProps {
    getPublications: () => Promise<any>;
    deletePublication: (id: string) => Promise<any>;
}

const initialState = {
    loaded: false,
    displayedPublications: OrderedMap()
};

export type State = typeof initialState;

const LoaderExampleLoader = () => (
    <Segment>
        <Dimmer active>
            <Loader/>
        </Dimmer>

        <Image src="http://via.placeholder.com/1250x300"/>
    </Segment>
);

class PublicationsPage extends React.Component<StateProps & DispatchProps, State> {

    state = {
        loaded: false,
        displayedPublications: this.props.publications
    };

    componentDidMount() {
        if (this.props.publications.size === 0) {
            this.props.getPublications().then(() => this.setState(() => ({
                displayedPublications: this.props.publications,
                loaded: true
            })));
        } else {
            this.setState(() => ({loaded: true}));
        }

    }

    onQueryChange = (evt) => {
        let newDisplayed = this.props.publications.filter(
            (pub: Publication) => pub.get('title').toLowerCase().indexOf(evt.target.value.toLowerCase()) !== -1
        );
        console.log(newDisplayed);
        console.log(evt.target.value);
        this.setState({
            displayedPublications: OrderedMap(newDisplayed)
        });
    }

    render() {

        return (
            <div>
                <Container>
                    <Grid>
                        <Grid.Row>
                            <Grid.Column floated={'left'} width={4}>
                                <Button as={Link} to={'/addPublication'} basic color="blue">Add New</Button>
                            </Grid.Column>
                            <Grid.Column floated={'right'} width={4}>
                                <Input icon={'search'} placeholder={'Search...'} onChange={this.onQueryChange}/>
                            </Grid.Column>
                        </Grid.Row>
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
        getPublications: (): Promise<any> => dispatch(getPublications()),
        deletePublication: (id: string): Promise<any> => dispatch(deletePublication(id))
    });

export default connect(mapStateToProps, mapDispatchToProps)(PublicationsPage);