import React from 'react';
import '../src/styles/index.css';

import { addDecorator } from '@storybook/react';
// import Layout from './Layout';
// addDecorator(storyFn => <Layout>{storyFn()}</Layout>);
import AstroProvider from '../src/components/astro/astro';

export const decorators = [
    (Story, context) => {
        return (
            <AstroProvider>
                <Story />
            </AstroProvider>
        );
    },
];
