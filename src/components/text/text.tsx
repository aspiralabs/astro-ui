// Generated with util/create-component.js
import React from 'react';
import { TextProps } from './text.types';
import { overrideTailwindClasses } from 'tailwind-override';

const Text: React.FC<TextProps> = ({ children, className = '' }) => (
    <p className={overrideTailwindClasses(`text-body font-body ${className}`)}>{children}</p>
);

export default Text;
