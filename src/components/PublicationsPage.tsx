import * as React from 'react';
import { connect, MapDispatchToProps } from 'react-redux';
import StateType from '../types/StateType';
import { getPublications } from '../actions/actions';
import { List } from 'immutable';
import { Publication } from '../models/Publication';
import { Dispatch } from 'redux';
import { PublicationsList } from './PublicationsList';

export interface Props {
    publications: List<Publication>;
}

export interface DispatchProps {
    getPublications: () => void;
}

const initialState = {

};

export type State = typeof initialState;

class PublicationsPage extends React.Component<Props & DispatchProps, State> {

    state = initialState;

    componentDidMount() {
        this.props.getPublications();
    }

    render() {

        return (
            <div>
                <PublicationsList publications={this.props.publications}/>
            </div>
        );
    }
}

const mapStateToProps = (state: StateType, ownProps: Props): Props => {
    return {publications: state.publications};
};

const mapDispatchToProps: MapDispatchToProps<DispatchProps, Props> = (dispatch: Dispatch<StateType>, ownProps: Props) =>
    ({
        getPublications: () => dispatch(getPublications())
    });

export default connect(mapStateToProps, mapDispatchToProps)(PublicationsPage);