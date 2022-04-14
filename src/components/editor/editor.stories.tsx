// Generated with util/create-component.js
import React from 'react';
import Editor, { AstroEditorContentViewer } from './editor';

export default {
    title: 'Editor',
};

export const BasicEditor = () => {
    const [editorValue, setEditorValue] = React.useState('');

    return (
        <div className="flex gap-4">
            <Editor onChange={value => setEditorValue(value)} />
            <AstroEditorContentViewer content={editorValue} />
        </div>
    );
};
