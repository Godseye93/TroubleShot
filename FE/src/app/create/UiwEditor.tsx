"use client";
import MDEditor from "@uiw/react-md-editor";
import { useState } from "react";

export default function UiwEditor() {
  const [mdinfo, setMdinfo] = useState("");
  return (
    <div className="w-[50rem] bg-white shadow-md rounded-lg flex justify-center">
      <div data-color-mode="light" className="w-[30rem]">
        <MDEditor minHeight={500} value={mdinfo} onChange={(e) => setMdinfo(e!)} />
      </div>
    </div>
  );
}
