import * as React from 'react';
import { Redirect } from 'react-router';
import { Form, Button, Message, Divider } from 'semantic-ui-react';
import { Author } from '../../models/Author';

export interface AuthorFormProps {
    author?: Author;
    onSubmit: (p: Author) => Promise<Author>;
}

type AuthorFormState = {
    id: string,
    name: string,
    familyName: string,
    institution: string,
    errors: Array<string>,
    loading: boolean,
    done: boolean

};

export default class AuthorForm extends React.Component<AuthorFormProps, AuthorFormState> {

    state: AuthorFormState = {
        id: this.props.author && this.props.author.get('id') || '',
        name: this.props.author && this.props.author.get('name') || '',
        familyName: this.props.author && this.props.author.get('familyName') || '',
        institution: this.props.author && this.props.author.get('institution') || '',
        errors: [],
        loading: false,
        done: false
    };

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value,
        });
    }

    handleSubmit = (e) => {
        e.preventDefault();

        // validation
        let errors: Array<string> = [];
        if (this.state.name === '') {
            errors.push('Name can\'t be empty!');
        }
        if (this.state.familyName === '') {
            errors.push('Family name can\'t be empty!');
        }
        if (this.state.institution === '') {
            errors.push('Institution name can\'t be empty!');
        }
        this.setState({errors});

        const isValid = errors.length === 0;

        if (isValid) {
            const {id, name, familyName, institution } = this.state;
            this.setState({loading: true});
            this.props.onSubmit(new Author({id, name, familyName, institution}))
                .then(() => {
                    this.setState((prevState) => ({done: !prevState.done}));
                });
        }
    }

    render() {

        const form = (
            <Form onSubmit={this.handleSubmit} loading={this.state.loading}>
                {this.state.errors.length !== 0 &&
                <Message color={'red'} negative={true} content={this.state.errors.join('<br>')}
                         display={'block !important'}/>}

                <Form.Input name={'name'} label="Name" placeholder="Name"
                            value={this.state.name}
                            onChange={this.handleChange}
                />

                <Form.Input name={'familyName'} label="Family name" placeholder="Family name"
                            value={this.state.familyName}
                            onChange={this.handleChange}
                />

                <Form.Input name={'institution'} label="Institution" placeholder="Institution"
                            value={this.state.institution}
                            onChange={this.handleChange}
                />

                <Divider/>
                <Button primary={true}>Save</Button>
            </Form>
        );

        return (
            <div>
                {this.state.done ? <Redirect to="/authors"/> : form}
            </div>
        );
    }
}
