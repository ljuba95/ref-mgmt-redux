import * as React from 'react';
import { connect } from 'react-redux';
import { Author } from '../../models/Author';

export interface Props {
    author: Author;
    match?: any;
}

// todo: edit author form

class EditAuthorForm extends React.Component<Props, any> {

    // onSubmit = (expense) => {
    //     return this.props.updatePublication(expense);
    // }
    //
    // componentDidMount() {
    //     if (this.props.match.params.id) {
    //         this.props.getPublication(this.props.match.params.id);
    //     }
    // }

    render() {
        return (
            <div>
                <h1>Edit author</h1>
                TODO
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps: Props): Props => {
    const id = ownProps.match.params.id;
    return {
        author: state.get('authors').get(id)
    };
};

// const mapDispatchToProps = (dispatch: Dispatch<StateType>, ownProps: any) => ({
//     updatePublication: (publication: Publication): Promise<any> => dispatch(updatePublication(publication)),
//     getPublication: (id: string): Promise<Publication> => dispatch(getPublication(id)),
//     getAuthors: (): Promise<any> => dispatch(getAuthors())
// });

export default connect(mapStateToProps)(EditAuthorForm);