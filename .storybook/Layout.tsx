import React, { ReactNode } from 'react';
import { AstroProvider } from '../src/components/astro/astro';
import '../src/styles/index.css';

interface Props {
    children: ReactNode;
}

const Layout = ({ children }: Props) => {
    const settingOverride = { rounded: false };

    return (
        <AstroProvider settings={settingOverride}>
            <div className="px-20 py-10">{children}</div>
        </AstroProvider>
    );
};

export default Layout;
