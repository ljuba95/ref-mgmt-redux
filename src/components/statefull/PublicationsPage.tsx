import * as React from 'react';
import { connect, MapDispatchToProps } from 'react-redux';
import StateType from '../../types/StateType';
import { getPublications } from '../../actions/Publications';
import { List } from 'immutable';
import { Publication } from '../../models/Publication';
import { Dispatch } from 'redux';
import { Container, Dimmer, Loader, Image, Segment, Button } from 'semantic-ui-react';
import  PublicationsList  from '../stateless/PublicationsList';

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

const LoaderExampleLoader = () => (
    <Segment>
        <Dimmer active>
            <Loader />
        </Dimmer>

        <Image src="/assets/images/wireframe/short-paragraph.png" />
    </Segment>
);
class PublicationsPage extends React.Component<Props & DispatchProps, State> {

    state = initialState;

    componentDidMount() {
        if ( this.props.publications.size === 0) {
            this.props.getPublications().then(() => this.setState(() => ({loaded: true})));
        } else {
            this.setState(() => ({loaded: true}));
        }

    }

    render() {

        return (
            <div>
            <Container>
                {this.state.loaded ? <PublicationsList publications= { this.props.publications }/> :
                    <LoaderExampleLoader/>}

            </Container>
            <Button  basic color="blue">Add New</Button>
            </div>
        );
    }
}

const mapStateToProps = (state: StateType, ownProps: Props): Props => {
    return {publications: state.publications};
};

const mapDispatchToProps: MapDispatchToProps<DispatchProps, Props> = (dispatch: Dispatch<StateType>, ownProps: Props) =>
    ({
        getPublications: (): Promise<any> => dispatch(getPublications())
    });

export default connect(mapStateToProps, mapDispatchToProps)(PublicationsPage);