"use client";

import { useState } from "react";

export default function CreateComment() {
  const [showCreate, setShowCreate] = useState(false);
  return (
    <div className="border-t-2 mt-3 pt-3">
      <div className="h-16 border-black border rounded-lg border-opacity-50 p-3 flex items-center">
        댓글을 남겨보세요!
      </div>
    </div>
  );
}
