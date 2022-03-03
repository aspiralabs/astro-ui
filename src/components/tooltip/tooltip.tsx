// Generated with util/create-component.js
import React from 'react';
import { TooltipProps } from './tooltip.types';

const Tooltip = ({ children, text, position = 'bottom-center' }: TooltipProps) => {
    let calculatedPosition = '';

    switch (position) {
        case 'bottom-left':
            calculatedPosition = 'top-full mt-1 left-0';
            break;
        case 'bottom-center':
            calculatedPosition = 'top-full mt-1 right-1/2 transform translate-x-1/2';
            break;
        case 'bottom-right':
            calculatedPosition = 'top-full mt-1 right-0';
            break;
        case 'top-left':
            calculatedPosition = 'bottom-full mb-1 left-0';
            break;
        case 'top-center':
            calculatedPosition = 'bottom-full mb-1 right-1/2 transform translate-x-1/2';
            break;
        case 'top-right':
            calculatedPosition = 'bottom-full mb-1 right-0';
            break;
        case 'left-top':
            calculatedPosition = 'top-0 right-full mr-1';
            break;
        case 'left-center':
            calculatedPosition = 'top-1/2 right-full transform -translate-y-1/2 mr-1';
            break;
        case 'left-bottom':
            calculatedPosition = 'bottom-0 right-full mr-1';
            break;
        case 'right-top':
            calculatedPosition = 'top-0 ml-1';
            break;
        case 'right-center':
            calculatedPosition = 'top-1/2 transform -translate-y-1/2 ml-1';
            break;
        case 'right-bottom':
            calculatedPosition = 'bottom-0 ml-1 ';
            break;
        default:
            calculatedPosition = 'top-100 mt-1 right-1/2 transform translate-x-1/2';
    }

    return (
        <div data-testid="tooltip" className="relative group inline-block">
            {children}

            <div
                className={`${calculatedPosition} bg-heading text-center justify-center items-center absolute px-2 py-1 rounded bg-opacity-75 hidden group-hover:inline-flex`}
            >
                <span className="text-xs text-white">{text}</span>
            </div>
        </div>
    );
};

export default Tooltip;
