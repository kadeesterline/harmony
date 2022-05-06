import React, { useState, useEffect } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { GrEdit } from "react-icons/gr";
import TipTapMenuBar from "../Components/TipTapMenuBar";
import { useMember } from "../Context/MemberContext";

const TipTapReply = ({ reply, setEditReplyInput, handleEditReply }) => {
  const [editable, setEditable] = useState(false);
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
          <button
            className="mx-3 p-2"
            type="button"
            onClick={(event) => setEditable(!editable)}
          >
            <GrEdit />
          </button>
          {editable ? (
            <div>
              <button className="mx-3 p-2" onClick={submitEdit}>
                {" "}
                Submit Edit{" "}
              </button>
              <TipTapMenuBar editor={editor} />
            </div>
          ) : null}
        </div>
      ) : null}
      <EditorContent editor={editor} />
    </>
  );
};
export default TipTapReply;
