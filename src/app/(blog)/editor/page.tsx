"use client";
import BlogEditor from "~/components/editor/TailwindEditor";
import { useState } from "react";
import { JSONContent } from "novel";

const Editor = () => {
  const [saveStatus, setSaveStatus] = useState<"Saved" | "Unsaved">("Saved");
  const blog: JSONContent | null = null;

  return (
    <div>
      <div className="relative w-full mx-auto max-w-screen-lg">
        <BlogEditor blog={blog} setSaveStatus={setSaveStatus} />
      </div>
    </div>
  );
};

export default Editor;
