import * as React from 'react';
import { connect, MapDispatchToProps } from 'react-redux';
import { Dispatch } from 'redux';
import { Author } from '../../models/Author';
import { saveAuthor } from '../../actions/Authors';
import AuthorForm from '../stateless/AuthorForm';

export interface DispatchProps {
    saveAuthor: (author: Author) => Promise<any>;
}

class AddAuthorForm extends React.Component<DispatchProps, any> {

    onSubmit = (expense) => {
        return this.props.saveAuthor(expense);
    }

    render() {
        return (
            <div>
                <h1>Add Author</h1>
                <AuthorForm
                    onSubmit={this.onSubmit}
                />
            </div>
        );
    }
}

const mapDispatchToProps: MapDispatchToProps<DispatchProps, any> = (dispatch: Dispatch<void>) =>
    ({
        saveAuthor: (author: Author): Promise<any> => dispatch(saveAuthor(author))
    });

export default connect(null, mapDispatchToProps)(AddAuthorForm);