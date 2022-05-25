import React from 'react';
import { Button, useAstro } from '../..';
import { BaseModalProps } from './modal.types';
import Text from '../text/text';

export interface TestModalProps extends BaseModalProps {
    test: string;
}

const DemoModal = ({ id, test }: TestModalProps) => {
    const { Modal } = useAstro();

    const handleClick = () => {
        Modal.hide(id);
    };

    return (
        <div className="bg-white p-8 relative rounded z-50">
            <Text>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fuga repellat iste maiores distinctio quae
                temporibus laborum eveniet ad non aut.
            </Text>
            <Button onClick={handleClick}>Close</Button>
        </div>
    );
};

export default DemoModal;
