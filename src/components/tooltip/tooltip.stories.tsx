// Generated with util/create-component.js
import React from 'react';
import Button from '../button/button';
import Tooltip from './tooltip';

export default {
    title: 'tooltip',
};

export const ToolTipButton = () => {
    return (
        <div>
            <div className="flex gap-4 my-8">
                <Tooltip text="Left" position="bottom-left">
                    <Button variant="primary">Primary Button</Button>
                </Tooltip>

                <Tooltip text="Center" position="bottom-center">
                    <Button variant="primary">Primary Button</Button>
                </Tooltip>

                <Tooltip text="Right" position="bottom-right">
                    <Button variant="primary">Primary Button</Button>
                </Tooltip>
            </div>

            <div className="flex gap-4 my-8 mt-24">
                <Tooltip text="Left" position="top-left">
                    <Button variant="primary">Primary Button</Button>
                </Tooltip>

                <Tooltip text="Center" position="top-center">
                    <Button variant="primary">Primary Button</Button>
                </Tooltip>

                <Tooltip text="Right" position="top-right">
                    <Button variant="primary">Primary Button</Button>
                </Tooltip>
            </div>

            <div className="flex flex-col gap-4 my-8 mt-24">
                <Tooltip text="Top" position="right-top">
                    <Button variant="primary">Primary Button</Button>
                </Tooltip>

                <Tooltip text="Center" position="right-center">
                    <Button variant="primary">Primary Button</Button>
                </Tooltip>

                <Tooltip text="Bottom" position="right-bottom">
                    <Button variant="primary">Primary Button</Button>
                </Tooltip>
            </div>

            <div className="flex flex-col gap-4 my-8 mt-24 ml-16">
                <Tooltip text="Top" position="left-top">
                    <Button variant="primary">Primary Button</Button>
                </Tooltip>

                <Tooltip text="Center" position="left-center">
                    <Button variant="primary">Primary Button</Button>
                </Tooltip>

                <Tooltip text="Bottom" position="left-bottom">
                    <Button variant="primary">Primary Button</Button>
                </Tooltip>
            </div>
        </div>
    );
};
