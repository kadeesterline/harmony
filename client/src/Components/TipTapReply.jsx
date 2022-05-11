import React, { useState, useEffect } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { GrEdit, GrAdd } from "react-icons/gr";
import TipTapMenuBar from "../Components/TipTapMenuBar";
import { useMember } from "../Context/MemberContext";
import Underline from "@tiptap/extension-underline";

const TipTapReply = ({
  reply,
  setEditReplyInput,
  handleEditReply,
  editable,
  setEditable,
}) => {
  const currentMember = useMember();
  const editor = useEditor({
    editable,
    content: `
        ${reply?.content}
      `,
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      setEditReplyInput({ content: html });
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
    handleEditReply(e);
  }

  return (
    <>
      {currentMember.id === reply?.room_member_id ? (
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
          className="m-3 p-2 text-xl bg-slate-300 rounded-full left-72 bottom-5 relative"
          onClick={submitEdit}
        >
          <GrAdd />
        </button>
      ) : null}
    </>
  );
};
export default TipTapReply;
