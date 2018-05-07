import * as React from 'react';
import { Publication } from '../../models/Publication';
import { connect, MapDispatchToProps } from 'react-redux';
import { savePublication } from '../../actions/Publications';
import { Dispatch } from 'redux';
import PubForm from '../stateless/PubForm';
import { Author } from '../../models/Author';
import { getAuthors } from '../../actions/Authors';

export interface DispatchProps {
    savePublication: (publication: Publication) => Promise<any>;
    getAuthors: () => Promise<any>;
}

export interface StateProps {
    authors: Map<string, Author>;
}

class AddPubForm extends React.Component<any & DispatchProps, any> {

    onSubmit = (expense) => {
        return this.props.savePublication(expense);
    }

    componentDidMount() {
        this.props.getAuthors();
    }

    render() {
        return (
            <div>
                <h1>Add Publication</h1>
                <PubForm
                    onSubmit={this.onSubmit}
                    authors={this.props.authors}
                />
            </div>
        );
    }
}

const mapStateToProps = (state): StateProps => {

    return {authors: state.get('authors')};
};

const mapDispatchToProps: MapDispatchToProps<DispatchProps, any> = (dispatch: Dispatch<void>, ownProps: any) =>
    ({
        savePublication: (publication: Publication): Promise<any> => dispatch(savePublication(publication)),
        getAuthors: (): Promise<any> => dispatch(getAuthors()),
    });

export default connect(mapStateToProps, mapDispatchToProps)(AddPubForm);