import * as React from 'react';
import { connect, MapDispatchToProps } from 'react-redux';
import StateType from '../../models/ReduxStateType';
import { getPublications } from '../../actions/Publications';
import { List } from 'immutable';
import { Publication } from '../../models/Publication';
import { Dispatch } from 'redux';
import { Container, Dimmer, Loader, Image, Segment, Button, Divider } from 'semantic-ui-react';
import PublicationsList from '../stateless/PublicationsList';
import { NavLink } from 'react-router-dom';

export interface Props {
    publications: List<Publication>;
}

export interface DispatchProps {
    getPublications: () => Promise<any>;
}

const initialState = {
    loaded: false
};

export type State = typeof initialState;

const Nav = props => (
    <NavLink
        exact
        {...props}
        activeClassName="active"
    />
);
const LoaderExampleLoader = () => (
    <Segment>
        <Dimmer active>
            <Loader/>
        </Dimmer>

        <Image src="http://via.placeholder.com/1250x300"/>
    </Segment>
);

class PublicationsPage extends React.Component<Props & DispatchProps, State> {

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

                    <Button as={Nav} to={'/addPublication'} basic color="blue">Add New</Button>
                    <Divider ></Divider>
                    {this.state.loaded ? <PublicationsList publications={this.props.publications}/> :
                        <LoaderExampleLoader/>}

                </Container>
            </div>
        );
    }
}

// todo: treba da se stavi tip za state, kad saznamo koji

const mapStateToProps = (state, ownProps: Props): Props => {
    console.log(state);
    return {publications: state.get('publications').toList()};
};

const mapDispatchToProps: MapDispatchToProps<DispatchProps, Props> = (dispatch: Dispatch<StateType>, ownProps: Props) =>
    ({
        getPublications: (): Promise<any> => dispatch(getPublications())
    });

export default connect(mapStateToProps, mapDispatchToProps)(PublicationsPage);