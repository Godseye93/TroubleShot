"use client";
import MDEditor, { commands } from "@uiw/react-md-editor";
import React, { SetStateAction, useState } from "react";
import { BsImage } from "react-icons/bs";
import FileUploader from "./FileUploader";
interface props {
  markdown: string;
  setMarkdown: React.Dispatch<SetStateAction<string>>;
}
export default function UiwEditor({ markdown, setMarkdown }: props) {
  return (
    <div className="shadow-md">
      <MDEditor
        height={500}
        value={markdown}
        commands={[
          commands.bold,
          commands.hr,
          commands.italic,
          commands.table,
          commands.code,
          commands.link,
          commands.divider,
          commands.codeBlock,
          commands.divider,
          commands.fullscreen,
          commands.quote,
          commands.unorderedListCommand,
          commands.orderedListCommand,
          commands.checkedListCommand,
          // Custom Toolbars
          commands.group([], {
            name: "update",
            groupName: "update",
            icon: <BsImage />,
            children: (handle) => {
              return <FileUploader handle={handle} />;
            },

            buttonProps: { "aria-label": "Insert title" },
          }),
        ]}
        onChange={(e) => setMarkdown(e ?? "")}
      />
    </div>
  );
}
