// Generated with util/create-component.js
import React from 'react';
import { Button } from '../..';
import { useAstro, useModal, useToast } from '../astro/astro';

export default {
    title: 'toast',
};

export const BasicToast = () => {
    const { Toast } = useToast();
    const { Modal } = useModal();
    const { AstroConfig } = useAstro();

    const handleSuccessClick = () => {
        console.log(useToast);
        console.log(Toast);
        console.log(Modal);
        console.log(AstroConfig);
        // Toast.success('This is a Success Message!');
    };

    return (
        <section className="flex gap-4">
            <Button variant="success" onClick={handleSuccessClick}>
                Success Toast
            </Button>
        </section>
    );
};
