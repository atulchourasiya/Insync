import { useEffect, useRef, useState } from "react";
import Quill from "quill";
import "quill/dist/quill.snow.css"; // Import Quill styles
import "./QuillEditor.css";
import { io } from "socket.io-client";

const socket = io(import.meta.env.VITE_SOCKET_URL as string);

const QuillEditor = () => {
  const editorRef = useRef<HTMLDivElement>(null);
  const documentId = "123";
  const [content, setContent] = useState("");
  useEffect(() => {
    if (editorRef.current) {
      new Quill(editorRef.current, {
        theme: "snow", // Specify theme
        modules: {
          toolbar: [
            [{ header: [] }],
            [{ font: [] }],
            [
              "bold",
              "italic",
              "underline",
              "strike",
              "blockquote",
              "code-block",
              "code",
              "formula",
            ],
            [{ indent: "-1" }, { indent: "+1" }],
            [{ script: "sub" }, { script: "super" }],
            [{ color: [] }, { background: [] }],
            [{ align: [] }],
            [{ list: "ordered" }, { list: "bullet" }],
            ["link", "image"],
          ],
        },
      });
    }
  }, []);

  useEffect(() => {
    // Connect to the document room
    socket.emit("join-document", documentId);

    // Listen for document data from the server
    socket.on("load-document", (document) => {
      setContent(document.data); // Initialize editor with document content
    });

    // Listen for real-time changes
    socket.on("receive-changes", (delta) => {
      // Apply the delta (e.g., using Quill.js)
      console.log("Changes received:", delta);
      // Here, integrate the delta to update the editor content
    });

    // Cleanup on unmount
    return () => {
      socket.disconnect();
    };
  }, [content, documentId]);

  return (
    <div className="flex-grow basis-[0]">
      <div  ref={editorRef} />
    </div>
  );
};

export default QuillEditor;
