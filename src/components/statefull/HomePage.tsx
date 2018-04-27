import * as React from 'react';
import { connect, MapDispatchToProps } from 'react-redux';
import StateType from '../../types/StateType';
import { Action, Dispatch } from 'redux';
import { action, asyncThunkAction } from '../../actions/Publications';

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

class HomePage extends React.Component<Props & DispatchProps, State> {

    state = initialState;

    render() {

        return (
            <div>
                Home Page
            </div>
        );
    }
}

const mapStateToProps = (state: StateType, props: Props) => {
    return {prop: 'asd'};
};

const mapDispatchToProps: MapDispatchToProps<DispatchProps, Props> = (dispatch: Dispatch<StateType>, ownProps: Props) =>
    ({
        action: () => dispatch(action()),
        asyncThunkAction: () => dispatch(asyncThunkAction())
    });

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);