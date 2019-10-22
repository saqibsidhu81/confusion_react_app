import React from 'react';
import { Media } from 'reactstrap';

function RenderLeader({ leader }) {
    return (
        <Media className='mt-3'>
            <Media>
                <img className='mr-3' src={leader.image} alt={leader.name} />
            </Media>
            <Media body>
                <Media heading>
                    {leader.name}
                </Media>
                <p>{leader.designation}</p>

                {leader.description}
            </Media>
        </Media>
    )
}

export default RenderLeader;