import React, { useState, useEffect } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { GrEdit, GrAdd } from "react-icons/gr";
import TipTapMenuBar from "../Components/TipTapMenuBar";
import { useMember } from "../Context/MemberContext";

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
    handleEditReply(e);
  }

  return (
    <>
      {currentMember.id === reply?.room_member_id ? (
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
export default TipTapReply;
