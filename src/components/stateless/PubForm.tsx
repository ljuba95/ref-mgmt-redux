import * as React from 'react';
import { Redirect } from 'react-router';
import { Form, Button, Message, Dropdown, Divider } from 'semantic-ui-react';
import { Publication } from '../../models/Publication';
import { Author } from '../../models/Author';

export interface PubFormProps {
    publication: Publication;
    authors: Map<string, Author>;
}

type PubFormState = {
    id: string,
    title: string,
    url: string,
    pages: number,
    year: number,
    authors: Array<string>,
    errors: Array<string>,
    loading: boolean,
    done: boolean

};

export default class PubForm extends React.Component<PubFormProps & any, PubFormState> {

    state: PubFormState = {
        id: this.props.publication && this.props.publication.get('id') || '',
        title: this.props.publication && this.props.publication.get('title') || '',
        url: this.props.publication && this.props.publication.get('url') || '',
        pages: this.props.publication && this.props.publication.get('pages') || 0,
        year: this.props.publication && this.props.publication.get('year') || 0,
        authors: this.props.publication && this.props.publication.get('authors') || [],
        errors: [],
        loading: false,
        done: false
    };

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value,
        });
    }

    handleDropdown = (e, v) => {
        this.setState({
            authors: v.value
        });
    }

    handleSubmit = (e) => {
        e.preventDefault();

        // validation
        let errors: Array<string> = [];
        if (this.state.title === '') {
            errors.push('Title Can\'t be empty!');
        }
        if (this.state.url === '') {
            errors.push('Url Can\'t be empty!');
        }
        this.setState({errors});

        const isValid = errors.length === 0;

        if (isValid) {
            const {id, title, url, pages, year, authors} = this.state;
            this.setState({loading: true});
            this.props.onSubmit({id, title, url, pages, year, authors})
                .then(() => {
                    this.setState((prevState) => ({done: !prevState.done}));
                });
        }
    }

    render() {

        const form = (
            <Form onSubmit={this.handleSubmit} loading={this.state.loading}>
                {this.state.errors.length !== 0 &&
                <Message color={'red'} negative={true} content={this.state.errors}
                         display={'block !important'}/>}
                <Form.Input name={'title'} label="Title" placeholder="Title" value={this.state.title}
                            onChange={this.handleChange}/>

                <Form.Input name={'url'} label="Url" placeholder="Url" value={this.state.url}
                            onChange={this.handleChange}/>

                <Form.Input name={'year'} type={'number'} label="Year" placeholder="Year" value={this.state.year}
                            onChange={this.handleChange}/>

                <Form.Input name={'pages'} type={'number'} label="pages" placeholder="Pages" value={this.state.pages}
                            onChange={this.handleChange}/>
                <Dropdown placeholder={'Choose authors'} fluid multiple search selection onChange={this.handleDropdown}
                          options={this.props.authors.map((author: Author, id: string) => ({
                              key: id,
                              value: id,
                              text: author.get('name')
                          })).toArray()}
                />
                <Divider/>
                <Button primary={true}>Save</Button>
            </Form>
        );

        return (
            <div>
                {this.state.done ? <Redirect to="/publications"/> : form}
            </div>
        );
    }
}
