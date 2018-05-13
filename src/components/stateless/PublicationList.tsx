import * as React from 'react';
import { OrderedMap } from 'immutable';
import { Publication } from '../../models/Publication';
import { Card, Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

type Map = { map: OrderedMap<string, Publication> };

export interface Props {
    publications: Map;
    deletePublication: (id: string) => Promise<any>;
}

export const PublicationList: React.SFC<Props> = (props: Props): JSX.Element => {

    function onDeletePub(id: string) {
        props.deletePublication(id).then((pubId: string) => alert(`Deleted pub with id ${pubId}`));
    }

    const renderCards = () => {
        return (<Card.Group centered>

            {props.publications.map.map((pub: Publication, id: string) => {
                return (<Card key={id}>
                        <Card.Content>
                            <Card.Header>{pub.get('title')}</Card.Header>
                            <Card.Meta>{pub.get('url')}</Card.Meta>
                            <Card.Description>
                                {pub.get('title')} is published in {pub.get('year')} year
                                and has {pub.get('pages')} pages and {pub.get('authors').size} authors.
                            </Card.Description>
                        </Card.Content>
                        <Card.Content extra>
                            <div className="ui two buttons">
                                <Button as={Link} to={`editPublication/${id}`} basic color="green">Edit</Button> />
                                <Button basic color="red" onClick={() => onDeletePub(id)}>Remove</Button>
                            </div>
                        </Card.Content>
                    </Card>
                );
            }).toArray()}
        </Card.Group>);
    };

    return props.publications.map.size === 0 ? <p>There are no publications.</p> : renderCards();

};

export default PublicationList;