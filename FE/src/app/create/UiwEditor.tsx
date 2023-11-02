"use client";
import MDEditor from "@uiw/react-md-editor";
import { useState } from "react";

export default function UiwEditor() {
  const [mdinfo, setMdinfo] = useState("");
  return (
    <>
      <div data-color-mode="light" className="w-full">
        <MDEditor height={865} value={mdinfo} onChange={(e) => setMdinfo(e!)} />
      </div>
    </>
  );
}
