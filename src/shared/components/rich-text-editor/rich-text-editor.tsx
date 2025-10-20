'use client';

import Document from '@tiptap/extension-document';
import Image from '@tiptap/extension-image';
import Underline from '@tiptap/extension-underline';
import { EditorContent, useEditor, useEditorState } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { Bold, Heading1, Heading2, Heading3, Italic, List } from 'lucide-react';

import { Button } from '../ui/button';

export default function RichTextEditor({
    value,
    onChange
}: {
    value?: string;
    onChange?: (val: string) => void;
}) {
    const editor = useEditor({
        extensions: [StarterKit, Underline, Document, Image],
        content: value || '',
        onUpdate: ({ editor }) => {
            onChange?.(editor.getHTML());
        },
        immediatelyRender: false,
        editable: true,
        editorProps: {
            attributes: {
                class: 'prose prose-sm sm:prose-base lg:prose-lg xl:prose-2xl m-5 focus:outline-none'
            }
        }
        // coreExtensionOptions: {
        //     clipboardTextSerializer: {
        //         blockSeparator: '\n'
        //     }
        // }
    });

    const { canUndo, canRedo } = useEditorState({
        editor,
        selector: (ctx) => {
            return {
                canUndo: ctx?.editor?.can().chain().focus().undo().run(),
                canRedo: ctx?.editor?.can().chain().focus().redo().run()
            };
        }
    });

    if (!editor) return null;

    return (
        <div className="border rounded-[1rem] overflow-hidden p-2 space-y-2">
            {/* Toolbar */}
            <div className="flex flex-wrap gap-2 border-b pb-2 mb-2">
                <Button
                    variant="outline_header"
                    size="icon_header"
                    onClick={() => editor.chain().focus().toggleBold().run()}
                    className={
                        editor.isActive('bold')
                            ? 'bg-[#1EA64A] rounded-lg text-white'
                            : 'text-[#14385C]'
                    }
                >
                    <Bold className="size-9" />
                </Button>
                <Button
                    variant="outline_header"
                    size="icon_header"
                    onClick={() => editor.chain().focus().toggleItalic().run()}
                    className={
                        editor.isActive('italic')
                            ? 'bg-[#1EA64A] rounded-lg text-white'
                            : 'text-[#14385C]'
                    }
                >
                    <Italic className="size-9" />
                </Button>
                <Button
                    variant="outline_header"
                    size="icon_header"
                    onClick={() =>
                        editor.chain().focus().toggleBulletList().run()
                    }
                    className={
                        editor.isActive('bulletList')
                            ? 'bg-[#1EA64A] rounded-lg text-white'
                            : 'text-[#14385C]'
                    }
                >
                    <List className="size-9" />
                </Button>
                <Button
                    variant="outline_header"
                    size="icon_header"
                    onClick={() =>
                        editor.chain().focus().toggleHeading({ level: 1 }).run()
                    }
                    className={
                        editor.isActive('heading', { level: 1 })
                            ? 'bg-[#1EA64A] rounded-lg text-white'
                            : 'text-[#14385C]'
                    }
                >
                    <Heading1 className="size-9" />
                </Button>
                <Button
                    variant="outline_header"
                    size="icon_header"
                    onClick={() =>
                        editor.chain().focus().toggleHeading({ level: 2 }).run()
                    }
                >
                    <Heading2 className="size-9" />
                </Button>
                <Button
                    variant="outline_header"
                    size="icon_header"
                    onClick={() =>
                        editor.chain().focus().toggleHeading({ level: 3 }).run()
                    }
                >
                    <Heading3 className="size-9" />
                </Button>
            </div>

            {/* Editor Content */}
            <EditorContent
                editor={editor}
                className="min-h-[250px] prose focus:outline-none "
            />
        </div>
    );
}
