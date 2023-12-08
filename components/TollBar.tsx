"use client";
import { type Editor } from "@tiptap/react";
import { FC } from "react";
import {
  List,
  Heading1,
  Heading2,
  Strikethrough,
  Italic,
  ListOrdered,
  Bold,
  Undo,
  Underline,
  Quote,
} from "lucide-react";
import { Toggle } from "./ui/toggle";
import { BiParagraph } from "react-icons/bi";
const TollBar: FC<{ editor: Editor | null }> = ({ editor }) => {
  if (!editor) return;
  return (
    <div className="border border-input mt-2">
      <Toggle
        size="sm"
        pressed={editor.isActive("heading", { level: 1 })}
        onPressedChange={() =>
          editor.chain().focus().toggleHeading({ level: 1 }).run()
        }
      >
        <Heading1 className="w-4 h-4" />
      </Toggle>

      <Toggle
        size="sm"
        pressed={editor.isActive("heading", { level: 2 })}
        onPressedChange={() =>
          editor.chain().focus().toggleHeading({ level: 2 }).run()
        }
      >
        <Heading2 className="w-4 h-4" />
      </Toggle>
      <Toggle
        size="sm"
        pressed={editor.isActive("bold")}
        onPressedChange={() => editor.chain().focus().toggleBold().run()}
      >
        <Bold className="w-4 h-4" />
      </Toggle>

      <Toggle
        size="sm"
        pressed={editor.isActive("blockquote")}
        onPressedChange={() => editor.chain().focus().toggleBlockquote().run()}
      >
        <Quote className="w-4 h-4" />
      </Toggle>
      <Toggle
        size="sm"
        pressed={editor.isActive("italic")}
        onPressedChange={() => editor.chain().focus().toggleItalic().run()}
      >
        <Italic className="w-4 h-4" />
      </Toggle>

      <Toggle
        size="sm"
        pressed={editor.isActive("bulletList")}
        onPressedChange={() => editor.chain().focus().toggleBulletList().run()}
      >
        <List className="w-4 h-4" />
      </Toggle>
      <Toggle
        size="sm"
        pressed={editor.isActive("orderedList")}
        onPressedChange={() => editor.chain().focus().toggleOrderedList().run()}
      >
        <ListOrdered className="w-4 h-4" />
      </Toggle>

      <Toggle
        size="sm"
        pressed={editor.isActive("strike")}
        onPressedChange={() => editor.chain().focus().toggleStrike().run()}
      >
        <Strikethrough className="w-4 h-4" />
      </Toggle>

      <Toggle
        size="sm"
        pressed={editor.isActive("paragraph")}
        onPressedChange={() => editor.chain().focus().setParagraph().run()}
      >
        <BiParagraph className="w-4 h-4" />
      </Toggle>

      <Toggle
        size="sm"
        pressed={!editor.can().chain().focus().undo().run()}
        onPressedChange={() => editor.chain().focus().undo().run()}
      >
        <Undo className="w-4 h-4" />
      </Toggle>
    </div>
  );
};

export default TollBar;
