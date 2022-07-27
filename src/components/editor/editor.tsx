// =============================================================================
// ICONS
// =============================================================================
import React from 'react';
import {
    faAlignCenter,
    faAlignLeft,
    faAlignRight,
    faBold,
    faCode,
    faHighlighter,
    faItalic,
    faListCheck,
    faListOl,
    faListUl,
    faMarker,
    faRotateLeft,
    faRotateRight,
    faStrikethrough,
    faUnderline,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { EditorContent, useEditor } from '@tiptap/react';
import TextAlign from '@tiptap/extension-text-align';
import Underline from '@tiptap/extension-underline';
import StarterKit from '@tiptap/starter-kit';
import Highlight from '@tiptap/extension-highlight';
import TaskList from '@tiptap/extension-task-list';
import TaskItem from '@tiptap/extension-task-item';
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight';
import { lowlight } from 'lowlight/lib/common.js';
// ASTRO UI STUFF
import Button from '../button/button';
import { EditorMenuBarProps, EditorProps } from './editor.types';

// =============================================================================
// MENU BAR
// =============================================================================
const MenuBar = ({ editor }: EditorMenuBarProps) => {
    if (!editor) {
        return null;
    }

    return (
        <nav className="bg-surface flex gap-1 px-2 rounded-lg">
            <Button
                onClick={() => editor.chain().focus().toggleBold().run()}
                size="sm"
                variant="surface"
                active={editor.isActive('bold')}
            >
                <FontAwesomeIcon icon={faBold} />
            </Button>

            <Button
                onClick={() => editor.chain().focus().toggleItalic().run()}
                size="sm"
                variant="surface"
                active={editor.isActive('italic')}
            >
                <FontAwesomeIcon icon={faItalic} />
            </Button>

            <Button
                onClick={() => editor.chain().focus().toggleUnderline().run()}
                size="sm"
                variant="surface"
                active={editor.isActive('underline')}
            >
                <FontAwesomeIcon icon={faUnderline} />
            </Button>
            <Button
                onClick={() => editor.chain().focus().toggleStrike().run()}
                size="sm"
                variant="surface"
                active={editor.isActive('strike')}
            >
                <FontAwesomeIcon icon={faStrikethrough} />
            </Button>
            <Button
                onClick={() => editor.chain().focus().toggleHighlight().run()}
                size="sm"
                variant="surface"
                active={editor.isActive('highlight')}
            >
                <FontAwesomeIcon icon={faHighlighter} />
            </Button>

            {/* ========================================================= */}
            <Divider />
            {/* ========================================================= */}

            <Button
                onClick={() => editor.chain().focus().setTextAlign('left').run()}
                size="sm"
                variant="surface"
                active={editor.isActive({ textAlign: 'left' })}
            >
                <FontAwesomeIcon icon={faAlignLeft} />
            </Button>

            <Button
                onClick={() => editor.chain().focus().setTextAlign('center').run()}
                size="sm"
                variant="surface"
                active={editor.isActive({ textAlign: 'center' })}
            >
                <FontAwesomeIcon icon={faAlignCenter} />
            </Button>

            <Button
                onClick={() => editor.chain().focus().setTextAlign('right').run()}
                size="sm"
                variant="surface"
                active={editor.isActive({ textAlign: 'right' })}
            >
                <FontAwesomeIcon icon={faAlignRight} />
            </Button>

            <Button
                onClick={() => editor.chain().focus().toggleCodeBlock().run()}
                size="sm"
                variant="surface"
                active={editor.isActive('codeBlock')}
            >
                <FontAwesomeIcon icon={faCode} />
            </Button>

            {/* ========================================================= */}
            <Divider />
            {/* ========================================================= */}

            <Button
                onClick={() => editor.chain().focus().toggleBulletList().run()}
                size="sm"
                variant="surface"
                active={editor.isActive('bulletList')}
            >
                <FontAwesomeIcon icon={faListUl} />
            </Button>
            <Button
                onClick={() => editor.chain().focus().toggleOrderedList().run()}
                size="sm"
                variant="surface"
                active={editor.isActive('orderedList')}
            >
                <FontAwesomeIcon icon={faListOl} />
            </Button>

            <Button
                onClick={() => editor.chain().focus().toggleTaskList().run()}
                size="sm"
                variant="surface"
                active={editor.isActive('taskList')}
            >
                <FontAwesomeIcon icon={faListCheck} />
            </Button>

            <Button onClick={() => editor.chain().focus().undo().run()} size="sm" variant="surface">
                <FontAwesomeIcon icon={faRotateLeft} />
            </Button>

            <Button onClick={() => editor.chain().focus().redo().run()} size="sm" variant="surface">
                <FontAwesomeIcon icon={faRotateRight} />
            </Button>
        </nav>
    );
};

// =============================================================================
// MAIN EDITOR
// =============================================================================
const AstroEditor = ({ className, content, name, onChange, minHeight = 100, maxHeight = 'auto' }: EditorProps) => {
    const mainEditor = useEditor({
        extensions: [
            StarterKit,
            Underline,
            Highlight,
            TextAlign.configure({
                types: ['heading', 'paragraph'],
            }),
            CodeBlockLowlight.configure({
                lowlight,
            }),
            TaskList,
            TaskItem.configure({
                nested: true,
            }),
        ],
        content: content || '',
        onUpdate: ({ editor }) => onChange && onChange(editor.getHTML()),
    });

    return (
        <React.Fragment>
            <div className={`bg-surface  flex flex-col p-3 rounded shadow-sm ${className}`}>
                {mainEditor && <MenuBar editor={mainEditor} />}
                <EditorContent
                    name={name}
                    editor={mainEditor}
                    style={{ minHeight, maxHeight }}
                    className="bg-white font-body mt-2 rounded text-body"
                />
            </div>
        </React.Fragment>
    );
};

// =============================================================================
// DIVIDER
// =============================================================================
const Divider = () => <div className="bg-surface-dark h-100 mx-1 w-px"></div>;

// =============================================================================
// CONTENT VIEWER
// =============================================================================
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const AstroEditorContentViewer = ({ content }: { content: string }) => {
    return (
        <div className="astro-editor-content-viewer ProseMirror w-full" dangerouslySetInnerHTML={{ __html: content }} />
    );
};

export default AstroEditor;
