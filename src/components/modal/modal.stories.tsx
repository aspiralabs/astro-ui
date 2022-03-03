// Generated with util/create-component.js
import React from 'react';
import { Button } from '../..';
import { useAstro } from '../astro/astro';
import DemoModal from './demo_modal';

export default {
    title: 'Modal',
};

export const BasicModal = () => {
    const { Modal } = useAstro();

    const handleSuccessClick = () => {
        Modal.show(DemoModal, {});
    };

    return (
        <section className="flex gap-4">
            <Button variant="success" onClick={handleSuccessClick}>
                Show Modal
            </Button>
        </section>
    );
};
