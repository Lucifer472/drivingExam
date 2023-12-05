"use client";
import { useEffect, useRef } from "react";
import EditorJS from "@editorjs/editorjs";
// @ts-ignore
import Header from "@editorjs/header";
// @ts-ignore
import Paragraph from "@editorjs/paragraph";
// @ts-ignore
import Underline from "@editorjs/underline";

const FaqForm = ({
  setData,
  initialData,
}: {
  setData: (data: EditorJS) => void;
  initialData?: any;
}) => {
  const editor = useRef<EditorJS | null>(null);
  useEffect(() => {
    if (initialData) {
      setData(initialData);
    }
  }, [initialData, setData]);
  useEffect(() => {
    if (!editor.current) {
      editor.current = new EditorJS({
        holder: "newEditor",
        data: initialData,
        tools: {
          header: {
            class: Header,
            inlineToolbar: true,
          },
          paragraph: {
            class: Paragraph,
            inlineToolbar: true,
          },
          underline: Underline,
        },
        onChange: () => {
          editor.current
            ?.save()
            .then((outputData: any) => {
              setData(outputData);
              console.log(outputData);
            })
            .catch((error: any) => {
              console.error("Error while saving:", error);
            });
        },
      });
    }
  }, [setData, initialData]);
  return <div id="newEditor" className="prose"></div>;
};

export default FaqForm;
