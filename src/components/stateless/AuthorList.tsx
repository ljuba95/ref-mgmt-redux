import * as React from 'react';
import { Map } from 'immutable';
import { Table, Button, Icon } from 'semantic-ui-react';
import { Author } from '../../models/Author';
import { Link } from 'react-router-dom';

type MapType = { map: Map<string, Author> };

export interface Props {
    authors: MapType;
    deleteAuthor: (id: string) => Promise<any>;
    history: any;
}

export const AuthorList: React.SFC<Props> = (props: Props): JSX.Element => {

    function onDeleteAuthor(id: string) {
        props.deleteAuthor(id).then((authorId: string) => alert(`Deleted author with id ${authorId}`));
    }

    function editAuthor(id: string) {
        props.history.push('/editAuthor/' + id);
    }

    const renderTable = () => {
        return (<Table selectable celled>
            <Table.Header>
                <Table.Row>
                    <Table.HeaderCell>Name</Table.HeaderCell>
                    <Table.HeaderCell>Family name</Table.HeaderCell>
                    <Table.HeaderCell>Institution</Table.HeaderCell>
                    <Table.HeaderCell>Delete</Table.HeaderCell>
                </Table.Row>
            </Table.Header>
            <Table.Body>
                {props.authors.map.map((author: Author, id: string) => {
                    return (<Table.Row key={id} onClick={() => editAuthor(id)}>
                            <Table.Cell>{author.get('name')}</Table.Cell>
                            <Table.Cell>{author.get('familyName')} </Table.Cell>
                            <Table.Cell>{author.get('institution')}</Table.Cell>
                            <Table.Cell>
                                <Button onClick={() => onDeleteAuthor(id)} color={'red'}>
                                    Delete
                                </Button>
                            </Table.Cell>

                        </Table.Row>
                    );
                }).toArray()}
            </Table.Body>
            <Table.Footer fullWidth>
                <Table.Row>
                    <Table.HeaderCell colSpan={4}>
                        <Button as={Link} to={'/addAuthor'} floated={'right'} icon
                                labelPosition={'left'} primary size={'small'}>
                            <Icon name={'user'}/> Add Author
                        </Button>
                    </Table.HeaderCell>
                </Table.Row>
            </Table.Footer>
        </Table>);
    };

    return props.authors.map.size === 0 ? <p>There are no authors.</p> : renderTable();

};

export default AuthorList;