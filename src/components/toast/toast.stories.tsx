// Generated with util/create-component.js
import React from 'react';
import { Button } from '../..';
import { useAstro } from '../astro/astro';

export default {
    title: 'Toast',
};

export const BasicToast = () => {
    const { Toast } = useAstro();

    return (
        <section className="flex gap-4">
            <Button variant="success" onClick={() => Toast.success('Success')}>
                Success Toast
            </Button>
            <Button variant="danger" onClick={() => Toast.error('Error')}>
                Error Toast
            </Button>
            <Button variant="warning" onClick={() => Toast.warning('Warning')}>
                Warning Toast
            </Button>
            <Button variant="info" onClick={() => Toast.info('Info')}>
                Info Toast
            </Button>
        </section>
    );
};
