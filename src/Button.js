import React from 'react';

const button = ({ onClick = null, children = null}) => (
    <button onClick={onClick}>{children}</button>
);

export default button;