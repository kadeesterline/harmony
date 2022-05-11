import React, { useState, useEffect } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { GrAdd } from "react-icons/gr";
import { useMember } from "../Context/MemberContext";
import TipTapMenuBar from "./TipTapMenuBar";
import Underline from "@tiptap/extension-underline";

const TipTapMessage = ({
  message,
  setEditMessageInput,
  handleEditMessage,
  editable,
  setEditable,
}) => {
  const currentMember = useMember();

  const editor = useEditor({
    editable,
    content: message.content ? `${message?.content}` : "",
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      setEditMessageInput({ content: html });
    },
    extensions: [StarterKit, Underline],
  });

  useEffect(() => {
    if (!editor) {
      return undefined;
    }

    editor.setEditable(editable);
  }, [editor, editable]);

  if (!editor) {
    return null;
  }

  function submitEdit(e) {
    handleEditMessage(e);
  }

  return (
    <>
      {currentMember.id === message?.room_member_id ? (
        <div>
          {editable ? (
            <div>
              <TipTapMenuBar editor={editor} />
            </div>
          ) : null}
        </div>
      ) : null}

      <EditorContent editor={editor} />
      {editable ? (
        <button
          className="m-3 p-2 text-xl bg-slate-300 rounded-full float-right"
          onClick={submitEdit}
        >
          <GrAdd />
        </button>
      ) : null}
    </>
  );
};

export default TipTapMessage;
