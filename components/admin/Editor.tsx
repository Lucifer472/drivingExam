"use client";
import { useEffect, useRef } from "react";
// Editorjs
import EditorJS from "@editorjs/editorjs";
// @ts-ignore
import ImageTool from "@editorjs/image";
// @ts-ignore
import Header from "@editorjs/header";
// @ts-ignore
import Paragraph from "@editorjs/paragraph";
// @ts-ignore
import Table from "@editorjs/table";
// @ts-ignore
import Quote from "@editorjs/quote";
// @ts-ignore
import Underline from "@editorjs/underline";
// @ts-ignore
import List from "@editorjs/list";
// @ts-ignore
import Marker from "@editorjs/marker";
import { byFile, byUrl } from "@/constant";

const Editor = ({
  setData,
  initialData,
}: {
  setData: (data: EditorJS) => void;
  initialData?: any;
}) => {
  const editorRef = useRef<EditorJS | null>(null);
  useEffect(() => {
    if (initialData) {
      setData(initialData);
    }
  }, [initialData, setData]);
  useEffect(() => {
    if (!editorRef.current) {
      editorRef.current = new EditorJS({
        holder: "editorjs",
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
          table: {
            class: Table,
            inlineToolbar: true,
          },
          quote: {
            class: Quote,
            inlineToolbar: true,
          },
          underline: Underline,
          Marker: {
            class: Marker,
            inlineToolbar: true,
          },
          list: {
            class: List,
            inlineToolbar: true,
            config: {
              defaultStyle: "unordered",
            },
          },
          image: {
            class: ImageTool,
            config: {
              endpoints: {
                byFile: byFile,
                byUrl: byUrl,
              },
            },
          },
        },
        onChange: () => {
          editorRef.current
            ?.save()
            .then((outputData: any) => {
              setData(outputData);
            })
            .catch((error: any) => {
              console.error("Error while saving:", error);
            });
        },
      });
    }
  }, [setData, initialData]);
  return <div id="editorjs" className="prose"></div>;
};

export default Editor;
