// Generated with util/create-component.js
import React from 'react';
import { IAstroProvider, AstroConfig, IAstroValue } from './astro.types';

// Create the Context
const AstroContext = React.createContext<IAstroValue>(null);

// Create the Provider used to wrap app
export const AstroProvider = ({ settings, children }: IAstroProvider) => {
    // Astro Default Configuration
    const AstroConfig: AstroConfig = { ...settings };

    // Value Exposed to the App
    const value = { AstroConfig };

    // Return Wrapper
    return <AstroContext.Provider value={value}>{children}</AstroContext.Provider>;
};

// Create a Hook to access the context anywhere
export const useAstro = () => React.useContext(AstroContext);
