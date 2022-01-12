// Generated with util/create-component.js
import React from 'react';

import { TitleProps } from './title.types';

const Title: React.FC<TitleProps> = ({ children, as = 'h1', className = '' }) => {
    switch (as) {
        case 'h1': {
            return <h1 className={`text-title  font-title  font-semibold ${className}`}>{children}</h1>;
        }
        case 'h2': {
            return <h2 className={`text-title font-title  font-semibold ${className}`}>{children}</h2>;
        }
        case 'h3': {
            return <h3 className={`text-title font-title font-semibold ${className}`}>{children}</h3>;
        }
        case 'h4': {
            return <h4 className={`text-title font-title font-semibold ${className}`}>{children}</h4>;
        }
        case 'h5': {
            return <h5 className={`text-title font-title  font-semibold ${className}`}>{children}</h5>;
        }
        case 'h6': {
            return <h6 className={`text-title font-title  font-semibold ${className}`}>{children}</h6>;
        }
    }
};

export default Title;
