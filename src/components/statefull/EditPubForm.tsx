import * as React from 'react';
import { Publication } from '../../models/Publication';
import { connect } from 'react-redux';
import StateType from '../../models/ReduxStateType';
import { getPublication, updatePublication } from '../../actions/Publications';
import { Dispatch } from 'redux';
import PubForm from '../stateless/PubForm';
import { Author } from '../../models/Author';
import { Map } from 'immutable';
import { getAuthors } from '../../actions/Authors';

export interface DispatchProps {
    updatePublication: (publication: Publication) => Promise<any>;
    getPublication: (id: string) => Promise<Publication>;
    getAuthors: () => Promise<any>;
}

export interface Props {
    publication: Publication;
    authors: Map<string, Author>;
    match?: any;
}

class EditPubForm extends React.Component<Props & DispatchProps, any> {

    onSubmit = (expense) => {
        return this.props.updatePublication(expense);
    }

    componentDidMount() {
        if (this.props.match.params.id) {
            this.props.getPublication(this.props.match.params.id);
            this.props.getAuthors();
        }
    }

    render() {
        return (
            <div>
                <h1>Edit publication</h1>
                <PubForm
                    onSubmit={this.onSubmit}
                    publication={this.props.publication}
                    authors={this.props.authors}
                />
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps: Props): Props => {
    const id = ownProps.match.params.id;
    return {
        publication: state.get('publications').get(id),
        authors: state.get('authors')
    };
};

const mapDispatchToProps = (dispatch: Dispatch<StateType>, ownProps: any) => ({
    updatePublication: (publication: Publication): Promise<any> => dispatch(updatePublication(publication)),
    getPublication: (id: string): Promise<Publication> => dispatch(getPublication(id)),
    getAuthors: (): Promise<any> => dispatch(getAuthors())
});

export default connect(mapStateToProps, mapDispatchToProps)(EditPubForm);