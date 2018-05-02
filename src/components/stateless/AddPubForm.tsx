import * as React from 'react';
import { Publication } from '../../models/Publication';
import { connect, MapDispatchToProps } from 'react-redux';
import StateType from '../../models/ReduxStateType';
import { savePublication } from '../../actions/Publications';
import { Dispatch } from 'redux';
import PubForm from '../stateless/PubForm';

export interface DispatchProps {
    savePublication: (publication: Publication) => Promise<any>;
}

class AddPubForm extends React.Component<any & DispatchProps, any> {

    onSubmit = (expense) => {
       return this.props.savePublication(expense);

    }
    render() {
        return (
            <div>
                <h1>Add Publication</h1>
                <PubForm
                    onSubmit={this.onSubmit}
                />
            </div>
        );
    }
}

const mapDispatchToProps: MapDispatchToProps<DispatchProps, any> = (dispatch: Dispatch<StateType>, ownProps: any) =>
    ({
        savePublication: (publication: Publication ): Promise<any> => dispatch(savePublication(publication))
    });

export default connect(null, mapDispatchToProps)(AddPubForm);