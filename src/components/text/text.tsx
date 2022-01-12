// Generated with util/create-component.js
import React from 'react';
import { TextProps } from './text.types';

const Text: React.FC<TextProps> = ({ children, className = '' }) => (
    <p className={`${className} text-body font-body`}>{children}</p>
);

export default Text;
