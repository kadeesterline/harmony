import {
  FaBold,
  FaItalic,
  FaStrikethrough,
  FaHeading,
  FaListOl,
  FaListUl,
  FaQuoteLeft,
  FaRedo,
  FaUndo,
  FaUnderline,
} from "react-icons/fa";
import { BsCode, BsCodeSquare } from "react-icons/bs";

const TipTapMenuBar = ({ editor }) => {
  if (!editor) {
    return null;
  }

  return (
    <div className="menu-bar bg-slate-400 rounded-t-lg">
      <div className="">
        <button
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={
            editor.isActive("bold")
              ? "is-active  bg-slate-300 rounded-lg hover:bg-white m-1"
              : "rounded-lg hover:bg-white m-1"
          }
        >
          <FaBold />
        </button>

        <button
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={
            editor.isActive("italic")
              ? "is-active  bg-slate-300 rounded-lg m-1"
              : "rounded-lg hover:bg-white m-1"
          }
        >
          <FaItalic />
        </button>

        <button
          onClick={() => editor.chain().focus().toggleStrike().run()}
          className={
            editor.isActive("strike")
              ? "is-active bg-slate-300 rounded-lg m-1"
              : "rounded-lg hover:bg-white m-1"
          }
        >
          <FaStrikethrough />
        </button>

        <button
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          className={
            editor.isActive("underline")
              ? "is-active  bg-slate-300 rounded-lg m-1"
              : "rounded-lg hover:bg-white m-1"
          }
        >
          <FaUnderline />
        </button>

        <button
          onClick={() => editor.chain().focus().toggleCode().run()}
          className={
            editor.isActive("code")
              ? "is-active  bg-slate-300 rounded-lg m-1"
              : "rounded-lg hover:bg-white m-1"
          }
        >
          <BsCode />
        </button>

        <button
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 1 }).run()
          }
          className={
            editor.isActive("heading", { level: 1 })
              ? "is-active bg-slate-300 rounded-lg m-1"
              : "rounded-lg hover:bg-white m-1"
          }
        >
          <FaHeading />
        </button>

        <button
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={
            editor.isActive("bulletList")
              ? "is-active  bg-slate-300 rounded-lg m-1"
              : "rounded-lg hover:bg-white m-1"
          }
        >
          <FaListUl />
        </button>

        <button
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={
            editor.isActive("orderedList")
              ? "is-active  bg-slate-300 rounded-lg m-1"
              : "rounded-lg hover:bg-white m-1"
          }
        >
          <FaListOl />
        </button>

        <button
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
          className={
            editor.isActive("codeBlock")
              ? "is-active  bg-slate-300 rounded-lg m-1"
              : "rounded-lg hover:bg-white m-1"
          }
        >
          <BsCodeSquare />
        </button>

        <button
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          className={
            editor.isActive("blockquote")
              ? "is-active  bg-slate-300 rounded-lg m-1"
              : "rounded-lg hover:bg-white m-1"
          }
        >
          <FaQuoteLeft />
        </button>
      </div>
      <div className="">
        <button onClick={() => editor.chain().focus().undo().run()}>
          <FaUndo />
        </button>

        <button onClick={() => editor.chain().focus().redo().run()}>
          <FaRedo />
        </button>
      </div>
    </div>
  );
};
export default TipTapMenuBar;
