import { VSCodeTextArea, VSCodeButton } from "@vscode/webview-ui-toolkit/react";
import { useEffect, useState } from "react";
import { BsReplyAll } from "react-icons/bs";
import { VscCopy } from "react-icons/vsc";
import { vscode } from "./utilities/vscode";

interface Props {
  sessionId: number;
  troubleId: string | undefined;
}

const Solution = ({ sessionId, troubleId }: Props) => {
  const [articleInfo, setArticleInfo] = useState({
    description: "",
    code: "",
  });

  const { description, code } = articleInfo;
  function onChange(e: any) {
    const { name, value } = e.target;
    setArticleInfo({
      ...articleInfo,
      [name]: value,
    });
  }

  function onCreateMarkdown() {
    const { description, code } = articleInfo;

    let markdownText = `## SOLUTION\n\n`;
    markdownText += `---------------------------------------\n\n`;
    markdownText += `### 해결 코드\n\`\`\`\n${code}\n\`\`\`\n\n`;
    markdownText += `### 해결 설명\n${description}\n\n`;

    return markdownText;
  }

  function checkValid() {
    const { description } = articleInfo;
    if (description.trim().length < 2) {
      vscode.postMessage({
        command: "showMessage",
        type: "error",
        content: "Description is too short!",
      });
      return false;
    }
    return true;
  }

  async function onCopyMarkdown() {
    if (!checkValid()) return;
    try {
      await navigator.clipboard.writeText(onCreateMarkdown());
      vscode.postMessage({
        command: "showMessage",
        type: "info",
        content: "Copied to clipboard!",
      });
    } catch (error) {
      vscode.postMessage({
        command: "showMessage",
        type: "error",
        content: "Failed to copy to clipboard!",
      });
    }
  }

  function onSolveTrouble() {
    const isLogin = sessionId !== -1;
    if (isLogin) {
      return;
    }
    vscode.postMessage({
      command: "solveTrouble",
      articleInfo: {
        content: onCreateMarkdown(),
        troubleId,
      },
    });
  }

  return (
    <section className="flex flex-col w-2/3 gap-1 ">
      <VSCodeTextArea value={code} onInput={onChange} name="code">
        해결 코드
      </VSCodeTextArea>
      <VSCodeTextArea value={description} onInput={onChange} name="description">
        상세 설명
      </VSCodeTextArea>
      <div className="flex items-center justify-center gap-5 mt-5">
        <div onClick={onCopyMarkdown}>
          <VSCodeButton>
            <VscCopy className="mr-3 " />
            마크다운 코드 복사
          </VSCodeButton>
        </div>

        <div onClick={onSolveTrouble}>
          <VSCodeButton>
            <BsReplyAll className="mr-3 " />
            SOLUTION 달기
          </VSCodeButton>
        </div>
      </div>
    </section>
  );
};
export default Solution;
