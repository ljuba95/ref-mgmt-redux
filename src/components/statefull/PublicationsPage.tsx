import * as React from 'react';
import { connect, MapDispatchToProps } from 'react-redux';
import StateType from '../../types/StateType';
import { getPublications } from '../../actions/Publications';
import { List } from 'immutable';
import { Publication } from '../../models/Publication';
import { Dispatch } from 'redux';
import { Container } from 'semantic-ui-react';
import { PublicationsList } from '../stateless/PublicationsList';

export interface Props {
    publications: List<Publication>;
}

export interface DispatchProps {
    getPublications: () => Promise<any>;
}

const initialState = {

};

export type State = typeof initialState;

class PublicationsPage extends React.Component<Props & DispatchProps, State> {

    state = initialState;

    componentDidMount() {
        this.props.getPublications().then(() => alert('test'));
    }

    render() {

        return (
            <Container>
                <PublicationsList publications={this.props.publications}/>
            </Container>
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