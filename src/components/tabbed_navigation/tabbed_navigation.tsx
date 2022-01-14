// Generated with util/create-component.js
import React, { useEffect, useState } from 'react';

import Text from '../text/text';
import { TabbedNavigationProps, ITabContentProps } from './tabbed_navigation.types';

export const TabbedNavigation = ({ current, setter, children }: TabbedNavigationProps) => {
    const [activeTab, setActiveTab] = useState(children[current]);

    const handleClick = (index: number) => {
        if (current === index) return;
        setter(index);
    };

    useEffect(() => {
        setActiveTab(children[current]);

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [current]);

    return (
        <div>
            <nav className="border-b border-panel flex">
                {children.map((child, index: number) => {
                    const active = index === current ? true : false;

                    return (
                        <div
                            className={`p-4 ${active ? 'bg-panel' : ''} transition cursor-pointer hover:bg-panel-hover`}
                            onClick={() => handleClick(index)}
                            key={index}
                        >
                            <Text>{child.props.title}</Text>
                        </div>
                    );
                })}
            </nav>
            <div key={activeTab?.toString()}>{activeTab}</div>
        </div>
    );
};

/**
 *
 * @param children React Element Children
 * @param index The Index of the content. Needs to match an index on the tabs
 * @param title The title that appears in the Tab
 * @param onMount a callback that fires when a tab is mounted
 * @returns children
 */
export const TabContent = ({ children, onMount }: ITabContentProps) => {
    useEffect(() => {
        if (onMount) {
            onMount();
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return children;
};
