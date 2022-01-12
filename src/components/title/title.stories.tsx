// Generated with util/create-component.js
import React from 'react';
import Title from './title';

export default {
    title: 'title',
};

export const TitleTypography = () => {
    return (
        <div>
            <Title>Title as H1</Title>
            <Title as="h2">Title as H2</Title>
            <Title as="h3">Title as H3</Title>
            <Title as="h4">Title as H4</Title>
            <Title as="h5">Title as H5</Title>
            <Title as="h6">Title as H6</Title>
        </div>
    );
};
