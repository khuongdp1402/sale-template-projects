import { useCallback, useEffect, useRef } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import Link from '@tiptap/extension-link';
import Placeholder from '@tiptap/extension-placeholder';
import { blogPostsApi } from '@/services/blogApi';
import { 
  Bold, 
  Italic, 
  List, 
  ListOrdered, 
  Heading1, 
  Heading2, 
  Link as LinkIcon,
  Image as ImageIcon,
  Undo,
  Redo
} from 'lucide-react';
import { Button } from '@/components/ui/Button';

interface TipTapEditorProps {
  content: string;
  onChange: (html: string, json?: string) => void;
  placeholder?: string;
}

export function TipTapEditor({ content, onChange, placeholder = 'Start writing...' }: TipTapEditorProps) {
  const uploadInProgressRef = useRef(false);

  const handleImageUpload = useCallback(async (file: File, editorInstance: any) => {
    if (!editorInstance || uploadInProgressRef.current) return;
    
    uploadInProgressRef.current = true;

    try {
      // Show loading state
      const loadingId = `loading-${Date.now()}`;
      editorInstance.chain().focus().insertContent(`<p id="${loadingId}">Uploading image...</p>`).run();

      // Upload image
      const result = await blogPostsApi.uploadImage(file);

      // Replace loading text with image
      const currentHtml = editorInstance.getHTML();
      const newHtml = currentHtml.replace(`<p id="${loadingId}">Uploading image...</p>`, `<img src="${result.url}" alt="${result.fileName}" />`);
      editorInstance.commands.setContent(newHtml);
    } catch (error) {
      console.error('Failed to upload image:', error);
      alert('Failed to upload image. Please try again.');
      // Remove loading text
      const currentHtml = editorInstance.getHTML();
      const cleanedHtml = currentHtml.replace(/<p[^>]*>Uploading image\.\.\.<\/p>/g, '');
      editorInstance.commands.setContent(cleanedHtml);
    } finally {
      uploadInProgressRef.current = false;
    }
  }, []);

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3],
        },
      }),
      Image.configure({
        inline: true,
        allowBase64: false,
        HTMLAttributes: {
          class: 'max-w-full h-auto rounded',
        },
      }),
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: 'text-blue-600 underline',
        },
      }),
      Placeholder.configure({
        placeholder,
      }),
    ],
    content,
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      const json = JSON.stringify(editor.getJSON());
      onChange(html, json);
    },
    editorProps: {
      attributes: {
        class: 'prose prose-sm sm:prose lg:prose-lg xl:prose-2xl dark:prose-invert max-w-none focus:outline-none min-h-[400px] p-4',
      },
    },
  });

  // Update content if it changes from outside
  useEffect(() => {
    if (editor && content !== editor.getHTML()) {
      editor.commands.setContent(content, false);
    }
  }, [editor, content]);

  // Setup drag & drop and paste handlers after editor is created
  useEffect(() => {
    if (!editor) return;

    const handleDrop = (event: DragEvent) => {
      if (event.dataTransfer?.files && event.dataTransfer.files[0]) {
        const file = event.dataTransfer.files[0];
        if (file.type.startsWith('image/')) {
          event.preventDefault();
          handleImageUpload(file, editor);
        }
      }
    };

    const handlePaste = (event: ClipboardEvent) => {
      const items = Array.from(event.clipboardData?.items || []);
      for (const item of items) {
        if (item.type.startsWith('image/')) {
          event.preventDefault();
          const file = item.getAsFile();
          if (file) {
            handleImageUpload(file, editor);
          }
          break;
        }
      }
    };

    const editorElement = editor.view.dom;
    editorElement.addEventListener('drop', handleDrop);
    editorElement.addEventListener('paste', handlePaste);

    return () => {
      editorElement.removeEventListener('drop', handleDrop);
      editorElement.removeEventListener('paste', handlePaste);
    };
  }, [editor, handleImageUpload]);

  const handleImageButtonClick = useCallback(() => {
    if (!editor) return;
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        handleImageUpload(file, editor);
      }
    };
    input.click();
  }, [editor, handleImageUpload]);

  const setLink = useCallback(() => {
    if (!editor) return;

    const previousUrl = editor.getAttributes('link').href;
    const url = window.prompt('URL', previousUrl);

    if (url === null) {
      return;
    }

    if (url === '') {
      editor.chain().focus().extendMarkRange('link').unsetLink().run();
      return;
    }

    editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
  }, [editor]);

  if (!editor) {
    return <div className="border rounded-md p-4 min-h-[400px]">Loading editor...</div>;
  }

  return (
    <div className="border border-slate-300 dark:border-slate-600 rounded-md overflow-hidden">
      {/* Toolbar */}
      <div className="border-b border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 p-2 flex flex-wrap items-center gap-1">
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={editor.isActive('bold') ? 'bg-slate-200 dark:bg-slate-700' : ''}
        >
          <Bold className="h-4 w-4" />
        </Button>
        
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={editor.isActive('italic') ? 'bg-slate-200 dark:bg-slate-700' : ''}
        >
          <Italic className="h-4 w-4" />
        </Button>

        <div className="w-px h-6 bg-slate-300 dark:bg-slate-600 mx-1" />

        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
          className={editor.isActive('heading', { level: 1 }) ? 'bg-slate-200 dark:bg-slate-700' : ''}
        >
          <Heading1 className="h-4 w-4" />
        </Button>

        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          className={editor.isActive('heading', { level: 2 }) ? 'bg-slate-200 dark:bg-slate-700' : ''}
        >
          <Heading2 className="h-4 w-4" />
        </Button>

        <div className="w-px h-6 bg-slate-300 dark:bg-slate-600 mx-1" />

        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={editor.isActive('bulletList') ? 'bg-slate-200 dark:bg-slate-700' : ''}
        >
          <List className="h-4 w-4" />
        </Button>

        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={editor.isActive('orderedList') ? 'bg-slate-200 dark:bg-slate-700' : ''}
        >
          <ListOrdered className="h-4 w-4" />
        </Button>

        <div className="w-px h-6 bg-slate-300 dark:bg-slate-600 mx-1" />

        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={setLink}
          className={editor.isActive('link') ? 'bg-slate-200 dark:bg-slate-700' : ''}
        >
          <LinkIcon className="h-4 w-4" />
        </Button>

        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={handleImageButtonClick}
        >
          <ImageIcon className="h-4 w-4" />
        </Button>

        <div className="flex-1" />

        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().focus().undo().run()}
          disabled={!editor.can().undo()}
        >
          <Undo className="h-4 w-4" />
        </Button>

        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().focus().redo().run()}
          disabled={!editor.can().redo()}
        >
          <Redo className="h-4 w-4" />
        </Button>
      </div>

      {/* Editor Content */}
      <div className="bg-white dark:bg-slate-900">
        <EditorContent editor={editor} />
      </div>

      {/* Help text */}
      <div className="border-t border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-4 py-2 text-xs text-slate-500">
        💡 Tip: Drag & drop images or paste them directly into the editor
      </div>
    </div>
  );
}
