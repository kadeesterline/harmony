import React from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import TipTapMenuBar from "./TipTapMenuBar";

const TipTap = ({ setInputState }) => {
  const editor = useEditor({
    extensions: [StarterKit, Underline],
    content: ``,
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      setInputState({ content: html });
    },
  });

  return (
    <div className="text-editor">
      <TipTapMenuBar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  );
};

export default TipTap;
