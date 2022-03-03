import { Editor, EditorContent, useEditor } from '@tiptap/react';

export interface EditorMenuBarProps {
    editor: Editor;
}

export interface EditorProps {
    content?: string;
    name?: string;
    onChange?: any;
    minHeight?: number | string;
    maxHeight?: number | string;
}
