import * as React from 'react';
import { Publication } from '../../models/Publication';
import { connect } from 'react-redux';
import StateType from '../../models/ReduxStateType';
import { getPublication, updatePublication } from '../../actions/Publications';
import { Dispatch } from 'redux';
import PubForm from '../stateless/PubForm';

export interface DispatchProps {
    updatePublication: (publication: Publication) => Promise<any>;
    getPublication: (id: string) => Promise<Publication>;
}

export interface Props {
    publication: Publication;
    match?: any;
}

class EditPubForm extends React.Component<Props & DispatchProps, any> {

    onSubmit = (expense) => {
        return this.props.updatePublication(expense);
    }

    componentDidMount() {
        if (this.props.match.params.id) {
            this.props.getPublication(this.props.match.params.id);
        }
    }

    componentWillReceiveProps(nextProps: Props) {
        this.setState({...nextProps});
    }

    render() {
        return (
            <div>
                <h1>Edit publication</h1>
                <PubForm
                    onSubmit={this.onSubmit}
                    {...this.props.publication}
                />
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps: Props): Props => {
    const id = ownProps.match.params.id;
    return {publication: state.get('publications').find((pub: Publication) => pub.get('id') === id)};
};

const mapDispatchToProps = (dispatch: Dispatch<StateType>, ownProps: any) => ({
    updatePublication: (publication: Publication): Promise<any> => dispatch(updatePublication(publication)),
    getPublication: (id: string): Promise<Publication> => dispatch(getPublication(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(EditPubForm);