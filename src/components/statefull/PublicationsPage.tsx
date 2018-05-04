import * as React from 'react';
import { connect } from 'react-redux';
import StateType from '../../models/ReduxStateType';
import { deletePublication, getPublications } from '../../actions/Publications';
import { OrderedMap } from 'immutable';
import { Publication } from '../../models/Publication';
import { Dispatch } from 'redux';
import { Container, Dimmer, Loader, Image, Segment, Button, Divider } from 'semantic-ui-react';
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
    loaded: false
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

    state = initialState;

    componentDidMount() {
        if (this.props.publications.size === 0) {
            this.props.getPublications().then(() => this.setState(() => ({loaded: true})));
        } else {
            this.setState(() => ({loaded: true}));
        }

    }

    render() {

        return (
            <div>
                <Container>

                    <Button as={Link} to={'/addPublication'} basic color="blue">Add New</Button>
                    <Divider ></Divider>
                    {this.state.loaded ?
                        <PublicationsList publications={{map: this.props.publications}}
                                          deletePublication={this.props.deletePublication}
                        /> : <LoaderExampleLoader/>}

                </Container>
            </div>
        );
    }
}

// todo: treba da se stavi tip za state, kad saznamo koji

const mapStateToProps = (state, ownProps: StateProps): StateProps => {
    return {publications: state.get('publications')};
};

const mapDispatchToProps = (dispatch: Dispatch<StateType>, ownProps: StateProps) =>
    ({
        getPublications: (): Promise<any> => dispatch(getPublications()),
        deletePublication: (id: string): Promise<any> => dispatch(deletePublication(id))
    });

export default connect(mapStateToProps, mapDispatchToProps)(PublicationsPage);