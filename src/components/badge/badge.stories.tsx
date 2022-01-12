// Generated with util/create-component.js
import React from 'react';
import Badge from './badge';

export default {
    title: 'badge',
};

export const BasicBage = () => {
    return (
        <div className="flex gap-2">
            <Badge>Badge Primary</Badge>
            <Badge variant="secondary">Badge Primary</Badge>
            <Badge variant="success">Badge Primary</Badge>
            <Badge variant="warning">Badge Primary</Badge>
            <Badge variant="danger">Badge Primary</Badge>
            <Badge variant="gray">Badge Primary</Badge>
        </div>
    );
};
