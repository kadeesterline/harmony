import React, { useState, useEffect } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { GrAdd } from "react-icons/gr";
import { useMember } from "../Context/MemberContext";
import TipTapMenuBar from "./TipTapMenuBar";

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
    extensions: [StarterKit],
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
              <button
                className="m-3 p-2 text-xl bg-slate-300 rounded-full"
                onClick={submitEdit}
              >
                <GrAdd />
              </button>
            </div>
          ) : null}
        </div>
      ) : null}

      <EditorContent editor={editor} />
    </>
  );
};

export default TipTapMessage;
