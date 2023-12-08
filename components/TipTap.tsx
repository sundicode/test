import { FC } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StaterKit from "@tiptap/starter-kit";
import ListItem from "@tiptap/extension-list-item";
import TextStyle from "@tiptap/extension-text-style";
import TollBar from "./TollBar";
const TipTap: FC<{
  onChange: (richText: string) => void;
  description: string;
}> = ({ onChange, description }) => {
  const editor = useEditor({
    extensions: [
      // TextStyle.configure({ types: [ListItem.name] }),
      StaterKit.configure({
        bulletList: {
          keepMarks: true,
          keepAttributes: false, 
        },
        orderedList: {
          keepMarks: true,
          keepAttributes: false, 
        },
      }),
    ],
    content: description,
    editorProps: {
      attributes: {
        class: "border border-input min-h-[200px] p-2",
      },
    },
    onUpdate({ editor }) {
      onChange(editor.getHTML());
    },
  });

  return (
    <div className="flex flex-col justify-stretch min-h-[250px]">
      <TollBar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  );
};

export default TipTap;
