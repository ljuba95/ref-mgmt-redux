import * as React from 'react';
import { OrderedMap } from 'immutable';
import { Publication } from '../../models/Publication';
import { Card, Button } from 'semantic-ui-react';
import { NavLink } from 'react-router-dom';
import { connect, MapDispatchToProps } from 'react-redux';
import { deletePublication } from '../../actions/Publications';
import { Dispatch } from 'redux';
import StateType from '../../models/ReduxStateType';

type Map = {map: OrderedMap<string, Publication>};

export interface Props {
    publications: Map;
}

export interface DispatchProps {
    deletePublication: (id: string) => Promise<any>;
}

const Nav = props => (
    <NavLink
        exact
        {...props}
        activeClassName="active"
    />
);

class PublicationsList extends React.Component<Props & DispatchProps, any> {

    onDeletePub(id: string) {

        this.props.deletePublication(id).then((pubId: string) => alert(`Deleted pub with id ${pubId}`));
    }

    render() {
        return <div>
            <Card.Group>
                {this.props.publications.map.map((pub: Publication, id: string) => (
                    <Card key={id}>
                        <Card.Content>
                            <Card.Header>{pub.get('title')}</Card.Header>
                            <Card.Meta>{pub.get('url')}</Card.Meta>
                            <Card.Description>{pub.get('title')} is published in {pub.get('year')} year
                                and has {pub.get('pages')} pages.</Card.Description>
                        </Card.Content>
                        <Card.Content extra>
                            <div className="ui two buttons">
                                <Button as={Nav} to={`editPublication/${id}`} basic color="green">Edit</Button> />
                                <Button basic color="red" onClick={() => this.onDeletePub(id)}>Remove</Button>
                            </div>
                        </Card.Content>
                    </Card>
                )).toArray()}
            </Card.Group>
        </div>;
    }
}

const mapDispatchToProps: MapDispatchToProps<DispatchProps, Props> = (dispatch: Dispatch<StateType>, ownProps: Props) =>
    ({
        deletePublication: (id: string): Promise<any> => dispatch(deletePublication(id))
    });

export default connect(null, mapDispatchToProps)(PublicationsList);