import * as React from 'react';
import { connect } from 'react-redux';
import StateType from '../models/ReduxStateType';
import { Action, Dispatch } from 'redux';
import { action, asyncThunkAction } from '../actions/Publications';

export interface Props {
    prop: any;
}

export interface DispatchProps {
    action: typeof action;
    asyncThunkAction: () => Promise<Action>;
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

const mapStateToProps = (state: StateType, props: Props) => {
    return {prop: 'asd'};
};

const mapDispatchToProps = (dispatch: Dispatch<StateType>, ownProps: Props) =>
    ({
        action: () => dispatch(action()),
        asyncThunkAction: () => dispatch(asyncThunkAction())
    });

export default connect(mapStateToProps, mapDispatchToProps)(StatefulComponent);