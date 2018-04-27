import * as React from 'react';
import { List } from 'immutable';
import { Publication } from '../../models/Publication';
import { Card } from 'semantic-ui-react';
export interface Props {
    publications: List<Publication>;
}

export const PublicationsList: React.SFC<Props> = (props: Props): JSX.Element => {

    return (
        <div>
            <Card.Group>

            {props.publications.map((pub: Publication) => (<Card key = {pub.id}>
                <Card.Content>
                    <Card.Header>{pub.title}</Card.Header>
                    <Card.Meta>{pub.url}</Card.Meta>
                    <Card.Description>{pub.title} is published in {pub.year} year
                        and has {pub.pages} pages.</Card.Description>
                </Card.Content>
            </Card>))}
            </Card.Group>
        </div>
    );
};