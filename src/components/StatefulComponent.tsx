import * as React from 'react';
import { connect, MapDispatchToProps, MapStateToProps } from 'react-redux';
import StateType from '../types/StateType';
import { bindActionCreators, Dispatch } from 'redux';
import { action, asyncThunkAction } from '../actions/actions';

export interface Props {
    prop: any;
}

export interface DispatchProps {
    action: any;
}

const initialState = {
    prop: 'asd'
};

export type State = typeof initialState;

class StatefulComponent extends React.Component<Props & DispatchProps, State> {

    state = initialState;

    render() {

        return (
            <div>
                Stateful
            </div>
        );
    }
}

const mapStateToProps: MapStateToProps<State, Props, StateType> = (state: StateType, props: Props) => {
    return {prop: state.prop};
};

const mapDispatchToProps: MapDispatchToProps<DispatchProps, Props> = (dispatch: Dispatch<StateType>, ownProps: Props) =>
    bindActionCreators(
        {
            action,
            asyncThunkAction
        },
        dispatch
    );

export default connect(mapStateToProps, mapDispatchToProps)(StatefulComponent);