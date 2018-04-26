import * as React from 'react';

export interface Props {

}

export const StatelessComponent: React.SFC<Props> = (props: Props): JSX.Element => {

    return (
        <div>Stateless</div>
    );
};