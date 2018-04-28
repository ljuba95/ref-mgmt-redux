import * as React from 'react';
import { List } from 'immutable';
import { Publication } from '../../models/Publication';
import { Card, Button } from 'semantic-ui-react';
import { NavLink } from 'react-router-dom';
import { connect, MapDispatchToProps } from 'react-redux';
import StateType from '../../types/StateType';
import { deletePublication } from '../../actions/Publications';
import { Dispatch } from 'redux';

export interface Props {
    publications: List<Publication>;
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

            {this.props.publications.map((pub: Publication) => (<Card key={pub.id}>
                <Card.Content>
                    <Card.Header>{pub.title}</Card.Header>
                    <Card.Meta>{pub.url}</Card.Meta>
                    <Card.Description>{pub.title} is published in {pub.year} year
                        and has {pub.pages} pages.</Card.Description>
                </Card.Content>
                <Card.Content extra>
                    <div className="ui two buttons">
                        <Button as={Nav} to={`editPublication/${pub.id}`} basic color="green">Edit</Button> />
                        <Button basic color="red" onClick={() => this.onDeletePub(pub.id)}>Remove</Button>
                    </div>
                </Card.Content>
            </Card>))}
        </Card.Group>
    </div>;
    }
}

const mapDispatchToProps: MapDispatchToProps<DispatchProps, Props> = (dispatch: Dispatch<StateType>, ownProps: Props) =>
    ({
        deletePublication: (id: string): Promise<any> => dispatch(deletePublication(id))
    });

export default connect(null, mapDispatchToProps)(PublicationsList);