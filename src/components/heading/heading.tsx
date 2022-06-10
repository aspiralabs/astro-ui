// Generated with util/create-component.js
import React from 'react';
import { overrideTailwindClasses } from 'tailwind-override';

import { TitleProps } from './heading.types';

const Title: React.FC<TitleProps> = ({ children, as = 'h1', className = '' }) => {
    const finalClassName = overrideTailwindClasses(`text-heading font-heading ${className}`);

    switch (as) {
        case 'h1': {
            return <h1 className={finalClassName}>{children}</h1>;
        }
        case 'h2': {
            return <h2 className={finalClassName}>{children}</h2>;
        }
        case 'h3': {
            return <h3 className={finalClassName}>{children}</h3>;
        }
        case 'h4': {
            return <h4 className={finalClassName}>{children}</h4>;
        }
        case 'h5': {
            return <h5 className={finalClassName}>{children}</h5>;
        }
        case 'h6': {
            return <h6 className={finalClassName}>{children}</h6>;
        }
    }
};

export default Title;
