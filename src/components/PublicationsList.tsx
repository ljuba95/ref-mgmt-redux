import * as React from 'react';
import { List } from 'immutable';
import { Publication } from '../models/Publication';

export interface Props {
    publications: List<Publication>;
}

export const PublicationsList: React.SFC<Props> = (props: Props): JSX.Element => {

    return (
        <div>
            {props.publications.map((pub: Publication) => <p>{pub.title}</p>) }
        </div>
    );
};